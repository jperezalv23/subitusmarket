"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent, CardFooter } from "./card"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"
import ChatDialog from "./chat-dialog"

interface WorkerCardProps {
  id: number
  name: string
  profession: string
  rating: number
  image: string
  available: boolean
}

export default function WorkerCard({ id, name, profession, rating, image, available }: WorkerCardProps) {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <Card className="w-full max-w-[280px] overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-[4/3] w-full bg-gray-100">
              <Avatar className="h-full w-full rounded-none">
                <AvatarImage src={image || "/placeholder.svg"} alt={name} className="object-cover" />
                <AvatarFallback className="rounded-none">{name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            {available ? (
              <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">Disponible</Badge>
            ) : (
              <Badge variant="outline" className="absolute top-2 right-2 bg-white">
                Ocupado
              </Badge>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-500 text-sm">{profession}</p>

            <div className="flex items-center mt-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={() => setChatOpen(true)}>
            Contactar
          </Button>
        </CardFooter>
      </Card>

      <ChatDialog open={chatOpen} onOpenChange={setChatOpen} worker={{ id, name, profession, image }} />
    </>
  )
}
