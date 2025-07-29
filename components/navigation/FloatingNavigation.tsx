"use client"

import { useRouter, usePathname } from 'next/navigation'
import { motion } from "framer-motion"
import { Home, Heart, MapPin, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingNavigationProps {
  activeScreen: string
  onScreenChange: (screen: string) => void
}

export default function FloatingNavigation({
  activeScreen,
  onScreenChange,
}: FloatingNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Ocultar en /map
  if (pathname === "/map") {
    return null
  }

  const navItems = [
    { id: "home", icon: Home, label: "Inicio", path: "/" },
    { id: "favorites", icon: Heart, label: "Favoritos", path: "/favorites" },
    { id: "map", icon: MapPin, label: "Mapa", path: "/map" },
    { id: "messages", icon: MessageCircle, label: "Mensajes", path: "/messages" },
    { id: "profile", icon: User, label: "Perfil", path: "/profile" },
  ]

  const handleClick = (id: string, path: string) => {
    onScreenChange(id)
    router.push(path)
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeScreen === item.id
            const isCenter = item.id === "map"

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleClick(item.id, item.path)}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isCenter
                  ? "bg-blue-500 text-white hover:bg-blue-600 rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0"
                  : isActive
                    ? "text-blue-600 rounded-lg p-2 sm:p-3"
                    : "text-gray-500 hover:text-gray-700 rounded-lg p-2 sm:p-3"
                  }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5`} />
                {!isCenter && <span className="text-[10px] sm:text-xs font-medium hidden sm:block">{item.label}</span>}
              </Button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
