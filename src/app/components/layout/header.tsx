"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../button"
import { Avatar, AvatarFallback, AvatarImage } from "../avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Menu, Bell, User, LogOut, Settings } from "lucide-react"
import RoleSwitcher from "../role-switcher"

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Determine if we're in worker or client mode based on the URL
  const isWorkerMode = pathname?.startsWith("/trabajador")

  // Don't show role switcher on the home page
  const showRoleSwitcher = pathname !== "/"

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            Conecta<span className="text-blue-600">Servicios</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {showRoleSwitcher && <RoleSwitcher currentRole={isWorkerMode ? "worker" : "client"} />}

            <Button variant="ghost" size="sm" asChild>
              <Link href={isWorkerMode ? "/trabajador" : "/cliente"}>Inicio</Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href={isWorkerMode ? "/trabajador/mensajes" : "/cliente/mensajes"}>Mensajes</Link>
            </Button>

            {isWorkerMode ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/trabajador/solicitudes">Solicitudes</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/trabajador/contratos">Contratos</Link>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/cliente/mis-solicitudes">Mis Solicitudes</Link>
              </Button>
            )}

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 space-y-2">
            {showRoleSwitcher && (
              <div className="py-2">
                <RoleSwitcher currentRole={isWorkerMode ? "worker" : "client"} />
              </div>
            )}

            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href={isWorkerMode ? "/trabajador" : "/cliente"}>Inicio</Link>
            </Button>

            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href={isWorkerMode ? "/trabajador/mensajes" : "/cliente/mensajes"}>Mensajes</Link>
            </Button>

            {isWorkerMode ? (
              <>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/trabajador/solicitudes">Solicitudes</Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/trabajador/contratos">Contratos</Link>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <Link href="/cliente/mis-solicitudes">Mis Solicitudes</Link>
              </Button>
            )}

            <Button variant="ghost" size="sm" className="w-full justify-start">
              <User className="mr-2 h-5 w-5" />
              <span>Perfil</span>
            </Button>

            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="mr-2 h-5 w-5" />
              <span>Configuración</span>
            </Button>

            <Button variant="ghost" size="sm" className="w-full justify-start text-red-500 hover:text-red-600">
              <LogOut className="mr-2 h-5 w-5" />
              <span>Cerrar sesión</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
