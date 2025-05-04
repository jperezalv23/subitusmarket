import { Button } from "./components/button"
import { Card, CardContent } from "./components/card"
import Link from "next/link"
import { Briefcase, Search, ArrowRight } from "lucide-react"
import RoleSelection from "./components/home/role-selection"
import Header from "./components/layout/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-3">SkillMatch</h1>
        <p className="text-gray-600 text-center text-lg mb-12">
          LLa forma más segura de contratar. La más sencilla de trabajar
        </p>

        <RoleSelection />

        {/* Características principales */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold text-center mb-12">¿Cómo funciona?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Busca servicios</h3>
                <p className="text-gray-500 text-center">
                  Encuentra profesionales calificados para cualquier trabajo que necesites realizar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Ofrece tus servicios</h3>
                <p className="text-gray-500 text-center">
                  Muestra tus habilidades y consigue clientes interesados en tu trabajo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                  <ArrowRight className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-center mb-2">Cambia de rol</h3>
                <p className="text-gray-500 text-center">
                  Alterna entre buscar y ofrecer servicios según tus necesidades del momento.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Categorías populares */}
        <section className="mt-24">
          <h2 className="text-2xl font-semibold text-center mb-12">Categorías Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Plomería",
              "Electricidad",
              "Carpintería",
              "Pintura",
              "Jardinería",
              "Limpieza",
              "Albañilería",
              "Cerrajería",
            ].map((category) => (
              <div
                key={category}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <p className="font-medium">{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Listo para comenzar?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ya sea que necesites contratar un servicio o quieras ofrecer tus habilidades profesionales, estamos aquí
            para ayudarte a conectar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/cliente">Buscar Servicios</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/trabajador">Ofrecer Servicios</Link>
            </Button>
          </div>
        </section>
      </div>

      <footer className="bg-gray-100 mt-24 py-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2023 Conecta Servicios. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
