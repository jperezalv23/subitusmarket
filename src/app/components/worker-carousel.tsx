"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import WorkerCard from "./worker-card"

// Datos de ejemplo para los trabajadores
const workers = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    profession: "Plomero",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: 2,
    name: "Ana Martínez",
    profession: "Electricista",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: 3,
    name: "Miguel Sánchez",
    profession: "Carpintero",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=400",
    available: false,
  },
  {
    id: 4,
    name: "Laura Gómez",
    profession: "Pintora",
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: 5,
    name: "Javier López",
    profession: "Jardinero",
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: 6,
    name: "María Fernández",
    profession: "Limpieza",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=400",
    available: false,
  },
  {
    id: 7,
    name: "Roberto Díaz",
    profession: "Albañil",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
  {
    id: 8,
    name: "Elena Torres",
    profession: "Cerrajera",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=400",
    available: true,
  },
]

export default function WorkerCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = direction === "left" ? -container.clientWidth / 2 : container.clientWidth / 2

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef

      // Check if we can scroll left
      setShowLeftButton(container.scrollLeft > 0)

      // Check if we can scroll right
      const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      setShowRightButton(canScrollRight)
    }
  }

  return (
    <div className="relative">
      {/* Navigation buttons */}
      {showLeftButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full h-10 w-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {showRightButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full h-10 w-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Carousel container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {workers.map((worker) => (
          <div key={worker.id} className="flex-shrink-0">
            <WorkerCard {...worker} />
          </div>
        ))}
      </div>
    </div>
  )
}
