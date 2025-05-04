import { Card, CardContent } from "../card"
import { Button } from "../button"
import Link from "next/link"
import { Search, Briefcase } from "lucide-react"

export default function RoleSelection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-8 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Buscar Servicios</h2>
          <p className="text-gray-600 mb-6">
            Encuentra profesionales calificados para realizar trabajos en tu hogar o negocio. Compara perfiles, lee
            reseñas y contrata al mejor.
          </p>
          <Button size="lg" className="w-full" asChild>
            <Link href="/cliente">Buscar Servicios</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-8 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Briefcase className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ofrecer Servicios</h2>
          <p className="text-gray-600 mb-6">
            Muestra tus habilidades profesionales, establece tus tarifas y horarios, y conecta con clientes que
            necesitan tus servicios.
          </p>
          <Button size="lg" className="w-full" asChild>
            <Link href="/trabajador">Ofrecer Servicios</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
