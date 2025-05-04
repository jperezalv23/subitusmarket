import SearchBar from "../components/search-bar"
import WorkerCarousel from "../components/worker-carousel"


export default function ClientHome() {
  return (
    <>
    
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-2">Encuentra tu Profesional</h1>
          <p className="text-gray-600 text-center mb-8">Conectamos clientes con los mejores profesionales</p>

          <SearchBar />

          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">Profesionales Destacados</h2>
            <WorkerCarousel />
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Categorías Populares</h2>
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
        </div>
      </main>
    </>
  )
}
