"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Briefcase } from "lucide-react"

interface RoleSwitcherProps {
  currentRole: "client" | "worker"
}

export default function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const [isWorker, setIsWorker] = useState(currentRole === "worker")
  const router = useRouter()

  // Handle role change
  useEffect(() => {
    if (isWorker && currentRole !== "worker") {
      // Convert current client path to worker path
      const newPath = "/trabajador" + (window.location.pathname.replace("/cliente", "") || "")
      router.push(newPath)
    } else if (!isWorker && currentRole !== "client") {
      // Convert current worker path to client path
      const newPath = "/cliente" + (window.location.pathname.replace("/trabajador", "") || "")
      router.push(newPath)
    }
  }, [isWorker, currentRole, router])

  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer ${
          !isWorker ? "bg-white shadow-sm" : ""
        }`}
        onClick={() => setIsWorker(false)}
      >
        <Search className={`h-4 w-4 ${!isWorker ? "text-blue-600" : "text-gray-500"}`} />
        <span className={`text-sm ${!isWorker ? "font-medium text-blue-600" : "text-gray-500"}`}>Cliente</span>
      </div>

      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer ${
          isWorker ? "bg-white shadow-sm" : ""
        }`}
        onClick={() => setIsWorker(true)}
      >
        <Briefcase className={`h-4 w-4 ${isWorker ? "text-green-600" : "text-gray-500"}`} />
        <span className={`text-sm ${isWorker ? "font-medium text-green-600" : "text-gray-500"}`}>Profesional</span>
      </div>
    </div>
  )
}
