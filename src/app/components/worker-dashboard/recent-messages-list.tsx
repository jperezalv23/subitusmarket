import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Datos de ejemplo para los mensajes
const messages = [
  {
    id: 1,
    sender: "Ana García",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "¿Cuándo podría venir a revisar la instalación?",
    time: "10:30",
    unread: true,
  },
  {
    id: 2,
    sender: "Carlos Pérez",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Gracias por el presupuesto, me parece bien.",
    time: "Ayer",
    unread: false,
  },
  {
    id: 3,
    sender: "Laura Martínez",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "¿Podría enviarme fotos de trabajos similares?",
    time: "Ayer",
    unread: false,
  },
]

export default function RecentMessagesList() {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{message.sender}</h3>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{message.message}</p>
            </div>

            {message.unread && <div className="h-2 w-2 bg-blue-600 rounded-full mt-2"></div>}
          </div>

          <div className="mt-3 flex justify-end">
            <Button size="sm">Responder</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
