"use client"

import React, { useState, useRef, useEffect } from "react"
import { Check } from "lucide-react"

export function DropdownMenu({
  trigger,
  children,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white border shadow-lg">
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({
  children,
  onClick,
  inset,
}: {
  children: React.ReactNode
  onClick?: () => void
  inset?: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
        inset ? "pl-8" : ""
      }`}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator() {
  return <div className="my-1 border-t border-gray-200" />
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-1 text-xs text-gray-500 font-semibold">
      {children}
    </div>
  )
}

export function DropdownMenuCheckboxItem({
  children,
  checked,
  onClick,
}: {
  children: React.ReactNode
  checked?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
    >
      <span className="mr-2 w-4 h-4 flex items-center justify-center">
        {checked && <Check size={16} />}
      </span>
      {children}
    </div>
  )
}
