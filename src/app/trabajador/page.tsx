import { Briefcase, MessageSquare, FileCheck, Star } from "lucide-react";

export default function WorkerDashboard() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Bienvenido, Miguel</h1>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Bienvenido de nuevo, Miguel</p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available-mode"
                  defaultChecked
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="available-mode" className="text-sm font-medium text-gray-700">
                  Disponible para trabajar
                </label>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Solicitudes Nuevas</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Mensajes</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Contratos Activos</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-amber-600" />
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Valoración</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold">4.8</h3>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Recent Service Requests */}
          <div className="bg-white shadow rounded-lg mb-8">
            <div className="flex flex-row items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">Solicitudes Recientes</h2>
                <p className="text-sm text-gray-500">
                  Solicitudes de servicio que coinciden con tu perfil
                </p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 border rounded hover:bg-gray-50">
                Ver todas
              </button>
            </div>
            <div className="p-4">
              {/* Aquí puedes implementar la lista de solicitudes recientes */}
              <p className="text-gray-500">No hay solicitudes recientes.</p>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white shadow rounded-lg">
            <div className="flex flex-row items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">Mensajes Recientes</h2>
                <p className="text-sm text-gray-500">Conversaciones con clientes</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 border rounded hover:bg-gray-50">
                Ver todos
              </button>
            </div>
            <div className="p-4">
              {/* Aquí puedes implementar la lista de mensajes recientes */}
              <p className="text-gray-500">No hay mensajes recientes.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}