import { Button } from "@/components/ui/button"
import { MapPin, Calendar, DollarSign } from "lucide-react"

// Datos de ejemplo para las solicitudes
const serviceRequests = [
  {
    id: 1,
    title: "Reparación de grifo con fuga",
    location: "Colonia Roma, CDMX",
    date: "Lo antes posible",
    budget: "Negociable",
    client: "Ana García",
  },
  {
    id: 2,
    title: "Instalación de lámparas en sala",
    location: "Polanco, CDMX",
    date: "Este fin de semana",
    budget: "$800 - $1,200",
    client: "Roberto Sánchez",
  },
  {
    id: 3,
    title: "Reparación de puerta de madera",
    location: "Condesa, CDMX",
    date: "En los próximos 5 días",
    budget: "$500 - $700",
    client: "Laura Martínez",
  },
]

export default function ServiceRequestList() {
  return (
    <div className="space-y-4">
      {serviceRequests.map((request) => (
        <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-medium">{request.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Cliente: {request.client}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  {request.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  {request.date}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                  {request.budget}
                </div>
              </div>
            </div>

            <div className="mt-3 md:mt-0 flex gap-2">
              <Button size="sm">Contactar</Button>
              <Button size="sm" variant="outline">
                Ver detalles
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
