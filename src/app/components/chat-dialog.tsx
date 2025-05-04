"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Send, FileText, PaperclipIcon } from "lucide-react";
import ContractRequest from "./contract-request";

interface ChatMessage {
  id: string;
  sender: "client" | "worker";
  text: string;
  timestamp: Date;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker: {
    id: number;
    name: string;
    profession: string;
    image: string;
  };
}

export default function ChatDialog({ open, onOpenChange, worker }: ChatDialogProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "worker",
      text: `Hola, soy ${worker.name}. ¿En qué puedo ayudarte?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showContractRequest, setShowContractRequest] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const clientMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "client",
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, clientMessage]);
    setNewMessage("");

    // Simulate worker response after a short delay
    setTimeout(() => {
      const workerResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "worker",
        text: `Gracias por tu mensaje. Estoy disponible para ayudarte con tu proyecto.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, workerResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg sm:max-w-[500px] h-[600px] flex flex-col p-0">
        {/* Header */}
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar>
            <AvatarImage src={worker.image || "/placeholder.svg"} alt={worker.name} />
            <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{worker.name}</h2>
            <p className="text-sm text-gray-500">{worker.profession}</p>
          </div>
          <button
            className="ml-auto text-gray-500 hover:text-gray-700"
            onClick={() => onOpenChange(false)}
          >
            ✕
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "client"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
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
            worker={worker}
            onClose={() => setShowContractRequest(false)}
            onSend={(details) => {
              // Add contract request message
              const contractMessage: ChatMessage = {
                id: Date.now().toString(),
                sender: "client",
                text: `📄 He enviado una solicitud de contrato:\n${details.description}\nPrecio: $${details.price}`,
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, contractMessage]);
              setShowContractRequest(false);
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
            <span>Solicitar Contrato</span>
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
    </div>
  );
}