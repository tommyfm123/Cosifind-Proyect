"use client"

import {
  Home,
  Heart,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/common/Logo"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import ProductSearchBar from "@/components/common/product-search-bar"
import { usePathname } from "next/navigation"


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
  const { isLoggedIn, user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const navItems = isLoggedIn
    ? [
      { id: "home", icon: Home, label: "Inicio", path: "/" },
      { id: "favorites", icon: Heart, label: "Favoritos", path: "/favorites" },
      { id: "map", icon: MapPin, label: "Mapa", path: "/map" },
      { id: "messages", icon: MessageCircle, label: "Mensajes", path: "/messages" },
      { id: "profile", icon: User, label: "Mi Perfil", path: "/profile" },
    ]
    : [
      { id: "home", icon: Home, label: "Inicio", path: "/" },
      { id: "map", icon: MapPin, label: "Mapa", path: "/map" },
      { id: "profile", icon: User, label: "Iniciar sesión", path: "/login" },
    ]

  const currentActive = navItems.find(item => pathname === item.path)?.id || "home"


  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/80 shadow-sm border-b border-white/20 h-16 lg:h-20 px-4 lg:px-9">
      <div className="py-2 sm:px-6 h-full flex items-center justify-between">
        {/* Versión mobile: solo logo centrado */}
        <div className="flex lg:hidden w-full justify-center items-center h-full">
          <button onClick={() => router.push("/")}>
            <Logo size="sm" />
          </button>
        </div>
        {/* Versión desktop: menú completo */}
        <div className="hidden lg:flex items-center w-full h-full justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <button onClick={() => router.push("/")}>
              <Logo size="sm" />
            </button>
          </div>
          {/* SearchBar SOLO si no estamos en "/" */}
          <div className="flex-1 h-full flex items-center mx-8">
            {currentActive !== "home" && (
              <ProductSearchBar className="w-full h-auto py-0 px-0 shadow-none" />
            )}
          </div>
          {/* Navigation */}
          <ul className="flex items-center gap-4 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentActive === item.id
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-gray-100"
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
                      ? "text-[#222] font-semibold bg-gray-100"
                      : "text-gray-600 hover:text-[#222] hover:bg-gray-100"
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
        {isLoggedIn ? (
          <Button variant="outline" size="sm" onClick={logout} className="ml-4">
            Cerrar sesión
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="bg-dark text-white ml-4"
            onClick={() => router.push("/signup")}
          >
            Adherí tu comercio
          </Button>
        )}
      </div>
    </div>
  )
}

