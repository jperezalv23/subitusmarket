"use client";

import { useState } from "react";
import { Search, LayoutDashboard, MessageSquare, Briefcase, FileCheck, Settings, LogOut } from "lucide-react";

export default function MensajesPage() {
  // Datos de ejemplo para las conversaciones
  const conversations = [
    {
      id: 1,
      name: "Ana García",
      lastMessage: "¿Cuándo podría venir a revisar la instalación?",
      time: "10:30",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Carlos Pérez",
      lastMessage: "Gracias por el presupuesto, me parece bien.",
      time: "Ayer",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Laura Martínez",
      lastMessage: "¿Podría enviarme fotos de trabajos similares?",
      time: "Ayer",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Roberto Sánchez",
      lastMessage: "Necesito el servicio para el próximo lunes.",
      time: "Lun",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Elena Rodríguez",
      lastMessage: "¿Acepta pagos con tarjeta?",
      time: "Dom",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigation = [
    { name: "Dashboard", href: "/trabajador", icon: LayoutDashboard },
    { name: "Mensajes", href: "/trabajador/mensajes", icon: MessageSquare },
    { name: "Solicitudes", href: "/trabajador/solicitudes", icon: Briefcase },
    { name: "Contratos", href: "/trabajador/contratos", icon: FileCheck },
    { name: "Configuración", href: "/trabajador/configuracion", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Profile section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <img src="/placeholder.svg?height=40&width=40" alt="Miguel Sánchez" className="h-full w-full rounded-full" />
              </div>
              <div>
                <h3 className="font-medium">Miguel Sánchez</h3>
                <p className="text-sm text-gray-500">Carpintero</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button className="w-full flex items-center justify-start px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:text-red-600">
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Lista de conversaciones */}
        <div className="w-full md:w-1/3 border-r bg-white">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold mb-4">Mensajes</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar conversaciones"
                className="pl-9 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-120px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                  conversation.id === 1 ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <img src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} className="h-full w-full rounded-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className={`text-sm truncate ${conversation.unread ? "font-medium" : "text-gray-500"}`}>
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {conversation.unread && <div className="h-2 w-2 bg-blue-600 rounded-full"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vista de chat */}
        <div className="hidden md:block md:w-2/3">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Selecciona una conversación para comenzar</h2>
          </div>
        </div>
      </div>
    </div>
  );
}