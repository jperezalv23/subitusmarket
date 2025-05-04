"use client";

import { Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react";

export default function ContratosPage() {
  // Datos de ejemplo para los contratos
  const contracts = [
    {
      id: 1,
      title: "Reparación de tuberías en baño",
      client: "Ana García",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      date: "15 de mayo, 2023",
      price: "$1,200",
      status: "pending",
      description: "Reparación de tuberías con fugas en el baño principal. Incluye reemplazo de válvulas y sellado.",
    },
    {
      id: 2,
      title: "Instalación de lámparas en sala",
      client: "Roberto Sánchez",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      date: "20 de mayo, 2023",
      price: "$800",
      status: "active",
      description: "Instalación de 3 lámparas de techo en sala. Cliente proporciona las lámparas.",
    },
    {
      id: 3,
      title: "Pintura de habitación",
      client: "Carlos Pérez",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      date: "25 de mayo, 2023",
      price: "$1,500",
      status: "active",
      description: "Pintura de habitación de 3x4 metros. Cliente proporciona la pintura.",
    },
    {
      id: 4,
      title: "Reparación de puerta",
      client: "Laura Martínez",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      date: "10 de mayo, 2023",
      price: "$600",
      status: "completed",
      description:
        "Reparación de puerta de madera que no cerraba correctamente. Incluye ajuste de bisagras y cerradura.",
    },
    {
      id: 5,
      title: "Instalación de aire acondicionado",
      client: "Elena Rodríguez",
      clientAvatar: "/placeholder.svg?height=40&width=40",
      date: "5 de mayo, 2023",
      price: "$2,200",
      status: "completed",
      description: "Instalación de aire acondicionado en sala. Incluye montaje y conexión eléctrica.",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="bg-yellow-500 text-white px-2 py-1 rounded">Pendiente</span>;
      case "active":
        return <span className="bg-green-500 text-white px-2 py-1 rounded">En progreso</span>;
      case "completed":
        return <span className="bg-blue-500 text-white px-2 py-1 rounded">Completado</span>;
      default:
        return <span className="bg-gray-500 text-white px-2 py-1 rounded">Desconocido</span>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r p-4">
        <h2 className="text-lg font-bold">Menú</h2>
        <ul className="mt-4 space-y-2">
          <li><a href="/trabajador" className="text-gray-600 hover:text-gray-900">Dashboard</a></li>
          <li><a href="/trabajador/contratos" className="text-gray-600 hover:text-gray-900">Contratos</a></li>
          <li><a href="/trabajador/mensajes" className="text-gray-600 hover:text-gray-900">Mensajes</a></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Contratos</h1>
          <p className="text-gray-500">Gestiona tus contratos con clientes</p>
        </div>

        <div className="space-y-6">
          {["pending", "active", "completed"].map((status) => (
            <div key={status}>
              <h2 className="text-xl font-semibold mb-4">
                {status === "pending" ? "Pendientes" : status === "active" ? "En progreso" : "Completados"}
              </h2>
              {contracts.filter((contract) => contract.status === status).length === 0 ? (
                <p className="text-gray-500">No hay contratos {status === "pending" ? "pendientes" : status === "active" ? "en progreso" : "completados"}.</p>
              ) : (
                contracts
                  .filter((contract) => contract.status === status)
                  .map((contract) => (
                    <div key={contract.id} className="bg-white shadow rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold">{contract.title}</h3>
                          <div className="flex items-center mt-2">
                            <img
                              src={contract.clientAvatar}
                              alt={contract.client}
                              className="h-10 w-10 rounded-full mr-2"
                            />
                            <span className="text-gray-600">{contract.client}</span>
                          </div>
                          <p className="text-gray-600 mt-2">{contract.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{contract.date}</span>
                            <DollarSign className="h-4 w-4 ml-4 mr-1" />
                            <span>{contract.price}</span>
                          </div>
                        </div>
                        <div>{getStatusBadge(contract.status)}</div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        {contract.status === "pending" && (
                          <>
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                              Aceptar
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                              Rechazar
                            </button>
                          </>
                        )}
                        {contract.status === "active" && (
                          <>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                              Marcar como completado
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                              Ver detalles
                            </button>
                          </>
                        )}
                        {contract.status === "completed" && (
                          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Ver detalles
                          </button>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}