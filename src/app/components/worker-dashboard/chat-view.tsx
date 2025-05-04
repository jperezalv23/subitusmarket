"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, FileText, PaperclipIcon } from "lucide-react"
import ContractRequest from "@/components/contract-request"

interface ChatMessage {
  id: string
  sender: "client" | "worker"
  text: string
  timestamp: Date
}

interface ChatViewProps {
  contact: {
    id: number
    name: string
    avatar: string
    lastSeen: string
  }
}

export default function ChatView({ contact }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "client",
      text: "Hola, necesito ayuda con una instalación eléctrica.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "2",
      sender: "worker",
      text: "Hola, claro. ¿Qué tipo de instalación necesitas?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    },
    {
      id: "3",
      sender: "client",
      text: "Necesito instalar 3 lámparas en mi sala. Ya tengo las lámparas, solo necesito la instalación.",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    },
    {
      id: "4",
      sender: "worker",
      text: "Entiendo. ¿Cuándo te gustaría que fuera a realizar el trabajo?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: "5",
      sender: "client",
      text: "¿Podrías este fin de semana?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    },
    {
      id: "6",
      sender: "worker",
      text: "Sí, tengo disponibilidad el sábado por la mañana. ¿Te parece bien?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: "7",
      sender: "client",
      text: "Perfecto. ¿Cuánto costaría el servicio?",
      timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [showContractRequest, setShowContractRequest] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const workerMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "worker",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, workerMessage])
    setNewMessage("")

    // Simulate client response after a short delay
    if (newMessage.includes("precio") || newMessage.includes("costo")) {
      setTimeout(() => {
        const clientResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "client",
          text: "Me parece bien. ¿Podemos formalizar un contrato?",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, clientResponse])
      }, 2000)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{contact.name}</h3>
            <p className="text-xs text-gray-500">{contact.lastSeen}</p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "worker" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "worker" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Contract request dialog */}
      {showContractRequest && (
        <ContractRequest
          worker={{
            id: 1,
            name: "Miguel Sánchez",
            profession: "Carpintero",
          }}
          onClose={() => setShowContractRequest(false)}
          onSend={(details) => {
            // Add contract message
            const contractMessage: ChatMessage = {
              id: Date.now().toString(),
              sender: "worker",
              text: `📄 He enviado una propuesta de contrato:\n${details.description}\nPrecio: $${details.price}`,
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, contractMessage])
            setShowContractRequest(false)
          }}
        />
      )}

      {/* Action buttons */}
      <div className="p-2 border-t flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setShowContractRequest(true)}
        >
          <FileText className="h-4 w-4" />
          <span>Enviar Contrato</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <PaperclipIcon className="h-4 w-4" />
          <span>Adjuntar</span>
        </Button>
      </div>

      {/* Message input */}
      <div className="p-4 border-t flex gap-2">
        <Input
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
