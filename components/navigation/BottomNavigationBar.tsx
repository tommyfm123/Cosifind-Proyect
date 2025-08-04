"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, Heart, MapPin, MessageCircle, User } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface BottomNavigationBarProps {
    activeScreen: string
    onScreenChange: (screen: string) => void
    scrollContainerRef?: React.RefObject<HTMLElement>
}

export default function BottomNavigationBar({
    activeScreen,
    onScreenChange,
    scrollContainerRef,
}: BottomNavigationBarProps) {
    const { isLoggedIn } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [hidden, setHidden] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

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

    const currentActive = navItems.find((item) => pathname === item.path)?.id || "home"

    // Evitando que el BottomNavigationBar se oculte en la página de /map
    useEffect(() => {
        const container = scrollContainerRef?.current || window
        const handleScroll = () => {
            const currentScrollY = scrollContainerRef?.current
                ? scrollContainerRef.current.scrollTop
                : window.scrollY

            // No ocultar el BottomNavigationBar en la página de /map
            if (pathname === "/map") {
                setHidden(false)
                return
            }

            if (currentScrollY > lastScrollY) {
                setHidden(true)
            } else {
                setHidden(false)
            }
            setLastScrollY(currentScrollY)
        }

        container.addEventListener("scroll", handleScroll)
        return () => container.removeEventListener("scroll", handleScroll)
    }, [lastScrollY, scrollContainerRef, pathname])

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: hidden ? 100 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 17 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-dark text-white py-2 px-4 shadow-lg lg:hidden"
        >
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = currentActive === item.id

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                onScreenChange(item.id)
                                router.push(item.path)
                            }}
                            className={`
                flex flex-col items-center justify-center gap-1
                p-2
                text-[10px] font-medium
                bg-transparent border-none outline-none ring-0 shadow-none
                transition-none
                ${isActive ? "text-blue-400" : "text-white"}
              `}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </motion.div>
    )
}
