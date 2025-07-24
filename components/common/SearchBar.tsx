"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  showFilters?: boolean
}

export default function SearchBar({ value, onChange, placeholder = "Buscar...", showFilters = true }: SearchBarProps) {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-4 py-3 text-base rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
        />
      </div>
      {showFilters && (
        <Button variant="outline" size="sm" className="rounded-full px-4 py-3 border-gray-200 bg-transparent">
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
