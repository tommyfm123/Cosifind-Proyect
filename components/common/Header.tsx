"use client"

import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  Home,
  Heart,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/common/Logo"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import ProductSearchBar from "@/components/common/product-search-bar"

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (value: string) => void
  placeholder?: string
  showFilters?: boolean
  onFiltersClick?: () => void
  showBackButton?: boolean
  onBackClick?: () => void
  variant?: "search" | "logo-only"
  activeScreen: string
  onScreenChange: (screen: string) => void
}

export default function Header({
  searchQuery = "",
  onSearchChange,
  placeholder = "Buscar productos, marcas y más...",
  showFilters = false,
  onFiltersClick,
  showBackButton = false,
  onBackClick,
  variant = "search",
  activeScreen,
  onScreenChange,
}: HeaderProps) {
  const router = useRouter()
  const navItems = [
    { id: "home", icon: Home, label: "Inicio", path: "/" },
    { id: "favorites", icon: Heart, label: "Favoritos", path: "/favorites" },
    { id: "map", icon: MapPin, label: "Mapa", path: "/map" },
    { id: "messages", icon: MessageCircle, label: "Mensajes", path: "/messages" },
    { id: "profile", icon: User, label: "Perfil", path: "/profile" },
  ]

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 h-20">
      <div className="px-9 sm:px-6 h-full flex items-center">
        <div className="hidden lg:flex items-center w-full h-full justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Logo size="sm" />
          </div>

          {/* SearchBar (oculto si no es search) */}
          {variant === "search" ? (
            <div className="flex-1 h-full flex items-center mx-8">
              <ProductSearchBar className="w-full h-12 py-0 px-0 shadow-none" />
            </div>
          ) : (
            <div className="flex-1" /> // Espacio vacío para empujar el menú a la derecha
          )}

          {/* Navigation */}
          <ul className="flex items-center gap-4 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeScreen === item.id
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-blue-100"
                      style={{ zIndex: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onScreenChange(item.id)
                      router.push(item.path)
                    }}
                    className={`flex items-center gap-2 transition-colors duration-200 px-3 py-2 rounded-lg relative z-10 ${isActive
                      ? "text-[#1B8FF] font-semibold bg-blue-100"
                      : "text-gray-600 hover:text-[#1B8FF] hover:bg-blue-100"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
