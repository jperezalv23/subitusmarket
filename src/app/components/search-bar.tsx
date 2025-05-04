"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Mic, X } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"

// Lista de sugerencias para autocompletar
const suggestions = [
  "Plomero para reparar grifo",
  "Electricista para instalación",
  "Carpintero para muebles a medida",
  "Pintor para interiores",
  "Jardinero para mantenimiento",
  "Albañil para remodelación",
  "Cerrajero para cambio de cerradura",
  "Técnico para reparar aire acondicionado",
]

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // SpeechRecognition setup
  const SpeechRecognition =
    typeof window !== "undefined" ? window.SpeechRecognition || (window as any).webkitSpeechRecognition : null
  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  if (recognition) {
    recognition.lang = "es-ES"
    recognition.continuous = false
    recognition.interimResults = false
  }

  useEffect(() => {
    // Filter suggestions based on query
    if (query.length > 0) {
      const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }

    // Handle click outside to close suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [query])

  // Handle voice recording
  const startRecording = () => {
    if (recognition) {
      setIsRecording(true)
      recognition.start()

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setQuery(transcript)
        setIsRecording(false)
      }

      recognition.onerror = () => {
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }
    }
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
      setIsRecording(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setShowSuggestions(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          <Input
            type="text"
            placeholder="Buscar servicio o profesional..."
            className="pl-10 pr-10 py-6 text-base w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowSuggestions(true)}
          />

          {query && (
            <button className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={clearSearch}>
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <Button
          variant={isRecording ? "destructive" : "default"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={isRecording ? stopRecording : startRecording}
        >
          <Mic className={`h-5 w-5 ${isRecording ? "animate-pulse" : ""}`} />
        </Button>
      </div>

      {/* Recording indicator */}
      {isRecording && (
        <div className="mt-2 text-center text-sm text-red-500 animate-pulse">Grabando... Hable ahora</div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(suggestion)
                  setShowSuggestions(false)
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
