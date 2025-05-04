"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Briefcase, FileCheck, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export default function WorkerSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/trabajador", icon: LayoutDashboard },
    { name: "Mensajes", href: "/trabajador/mensajes", icon: MessageSquare },
    { name: "Solicitudes", href: "/trabajador/solicitudes", icon: Briefcase },
    { name: "Contratos", href: "/trabajador/contratos", icon: FileCheck },
    { name: "Configuración", href: "/trabajador/configuracion", icon: Settings },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop and mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Profile section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Miguel Sánchez" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Miguel Sánchez</h3>
                <p className="text-sm text-gray-500">Carpintero</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 z-10" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
}