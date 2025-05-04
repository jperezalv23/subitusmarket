"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, DollarSign } from "lucide-react";

export default function SolicitudesPage() {
  // Datos de ejemplo para las solicitudes
  const serviceRequests = [
    {
      id: 1,
      title: "Reparación de grifo con fuga",
      description: "Tengo un grifo en la cocina que gotea constantemente. Necesito que lo reparen o reemplacen.",
      location: "Colonia Roma, CDMX",
      date: "Lo antes posible",
      budget: "Negociable",
      client: "Ana García",
      clientRating: 4.7,
      status: "new",
    },
    {
      id: 2,
      title: "Instalación de lámparas en sala",
      description:
        "Necesito instalar 3 lámparas de techo en mi sala. Ya tengo las lámparas, solo necesito la instalación.",
      location: "Polanco, CDMX",
      date: "Este fin de semana",
      budget: "$800 - $1,200",
      client: "Roberto Sánchez",
      clientRating: 4.9,
      status: "new",
    },
    {
      id: 3,
      title: "Reparación de puerta de madera",
      description: "La puerta de mi habitación no cierra correctamente. Necesito que la ajusten o reparen.",
      location: "Condesa, CDMX",
      date: "En los próximos 5 días",
      budget: "$500 - $700",
      client: "Laura Martínez",
      clientRating: 4.5,
      status: "new",
    },
    {
      id: 4,
      title: "Pintura de habitación",
      description: "Necesito pintar una habitación de 3x4 metros. Tengo la pintura, solo necesito la mano de obra.",
      location: "Del Valle, CDMX",
      date: "Próxima semana",
      budget: "$1,500",
      client: "Carlos Pérez",
      clientRating: 4.8,
      status: "applied",
    },
    {
      id: 5,
      title: "Instalación de aire acondicionado",
      description: "Tengo un aire acondicionado nuevo que necesito instalar en mi sala.",
      location: "Santa Fe, CDMX",
      date: "Flexible",
      budget: "$2,000 - $2,500",
      client: "Elena Rodríguez",
      clientRating: 4.6,
      status: "applied",
    },
  ];

  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r p-4">
        <h2 className="text-lg font-bold">Menú</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a href="/trabajador" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/trabajador/solicitudes" className="text-gray-600 hover:text-gray-900">
              Solicitudes
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Solicitudes de Servicio</h1>
            <p className="text-gray-500">Encuentra trabajos que coincidan con tus habilidades</p>
          </div>

          <div className="mt-4 md:mt-0 relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar solicitudes"
              className="pl-9 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 ${
              activeTab === "new" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
            }`}
          >
            Nuevas
          </button>
          <button
            onClick={() => setActiveTab("applied")}
            className={`px-4 py-2 ${
              activeTab === "applied" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
            }`}
          >
            Aplicadas
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 ${
              activeTab === "saved" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
            }`}
          >
            Guardadas
          </button>
        </div>

        {/* Tab content */}
        <div className="space-y-4">
          {activeTab === "new" &&
            serviceRequests
              .filter((request) => request.status === "new")
              .map((request) => (
                <div key={request.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
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

                      <div className="flex items-center text-sm text-gray-500">
                        <span>Cliente: {request.client}</span>
                        <span className="mx-2">•</span>
                        <span>Valoración: {request.clientRating}</span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col gap-2 justify-end">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Contactar
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

          {activeTab === "applied" &&
            serviceRequests
              .filter((request) => request.status === "applied")
              .map((request) => (
                <div key={request.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
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

                      <div className="flex items-center text-sm text-gray-500">
                        <span>Cliente: {request.client}</span>
                        <span className="mx-2">•</span>
                        <span>Valoración: {request.clientRating}</span>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col gap-2 justify-end">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Ver Mensajes
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-red-500 rounded hover:bg-gray-100">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

          {activeTab === "saved" && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tienes solicitudes guardadas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}