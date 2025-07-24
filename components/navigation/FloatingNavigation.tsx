"use client"

import { motion } from "framer-motion"
import { Home, Heart, MapPin, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingNavigationProps {
  activeScreen: string
  onScreenChange: (screen: string) => void
}

export default function FloatingNavigation({ activeScreen, onScreenChange }: FloatingNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Inicio" },
    { id: "favorites", icon: Heart, label: "Favoritos" },
    { id: "map", icon: MapPin, label: "Mapa" },
    { id: "messages", icon: MessageCircle, label: "Mensajes" },
    { id: "profile", icon: User, label: "Perfil" },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-sm"
    >
      <div className="bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-full px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeScreen === item.id
            const isCenter = item.id === "map"

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onScreenChange(item.id)}
                className={`flex flex-col items-center gap-1 p-3 h-auto transition-all duration-300 rounded-full ${
                  isCenter
                    ? "bg-blue-500 text-white hover:bg-blue-600 scale-110"
                    : isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive && !isCenter ? "animate-bounce" : ""}`} />
                <span className="text-xs font-medium hidden sm:block">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
