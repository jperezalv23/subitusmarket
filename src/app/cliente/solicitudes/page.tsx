import Header from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, DollarSign, Plus } from "lucide-react"

export default function MisSolicitudesPage() {
  // Datos de ejemplo para las solicitudes del cliente
  const clientRequests = [
    {
      id: 1,
      title: "Reparación de grifo con fuga",
      description: "Tengo un grifo en la cocina que gotea constantemente. Necesito que lo reparen o reemplacen.",
      location: "Colonia Roma, CDMX",
      date: "Lo antes posible",
      budget: "Negociable",
      status: "active",
      applicants: 3,
    },
    {
      id: 2,
      title: "Instalación de lámparas en sala",
      description:
        "Necesito instalar 3 lámparas de techo en mi sala. Ya tengo las lámparas, solo necesito la instalación.",
      location: "Polanco, CDMX",
      date: "Este fin de semana",
      budget: "$800 - $1,200",
      status: "active",
      applicants: 5,
    },
    {
      id: 3,
      title: "Pintura de habitación",
      description: "Necesito pintar una habitación de 3x4 metros. Tengo la pintura, solo necesito la mano de obra.",
      location: "Del Valle, CDMX",
      date: "Próxima semana",
      budget: "$1,500",
      status: "completed",
      applicants: 4,
    },
    {
      id: 4,
      title: "Reparación de puerta de madera",
      description: "La puerta de mi habitación no cierra correctamente. Necesito que la ajusten o reparen.",
      location: "Condesa, CDMX",
      date: "Completado el 15/04/2023",
      budget: "$600",
      status: "completed",
      applicants: 2,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activa</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completada</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Mis Solicitudes</h1>
              <p className="text-gray-500">Gestiona tus solicitudes de servicio</p>
            </div>

            <Button className="mt-4 md:mt-0" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Solicitud
            </Button>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active">
                Activas
                <Badge variant="secondary" className="ml-2">
                  2
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completadas
                <Badge variant="secondary" className="ml-2">
                  2
                </Badge>
              </TabsTrigger>
            </TabsList>

            {["active", "completed"].map((status) => (
              <TabsContent key={status} value={status} className="space-y-4">
                {clientRequests
                  .filter((request) => request.status === status)
                  .map((request) => (
                    <Card key={request.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="text-xl font-semibold">{request.title}</h3>
                              <div className="ml-2">{getStatusBadge(request.status)}</div>
                            </div>
                            <p className="text-gray-600 mb-4">{request.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm">{request.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm">{request.date}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                                <span className="text-sm">{request.budget}</span>
                              </div>
                            </div>

                            {request.status === "active" && (
                              <p className="text-sm text-blue-600">{request.applicants} profesionales interesados</p>
                            )}
                          </div>

                          <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col gap-2 justify-end">
                            {request.status === "active" ? (
                              <>
                                <Button>Ver Aplicantes</Button>
                                <Button variant="outline">Editar</Button>
                                <Button variant="outline" className="text-red-500 hover:text-red-600">
                                  Cancelar
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button variant="outline">Ver Detalles</Button>
                                <Button>Solicitar Similar</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </>
  )
}
