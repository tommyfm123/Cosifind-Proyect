"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Home, Heart, MapPin, MessageCircle, User } from "lucide-react"

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
    const router = useRouter()
    const [hidden, setHidden] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    const navItems = [
        { id: "home", icon: Home, label: "Inicio", path: "/" },
        { id: "favorites", icon: Heart, label: "Favoritos", path: "/favorites" },
        { id: "map", icon: MapPin, label: "Mapa", path: "/map" },
        { id: "messages", icon: MessageCircle, label: "Mensajes", path: "/messages" },
        { id: "profile", icon: User, label: "Perfil", path: "/profile" },
    ]

    useEffect(() => {
        const container = scrollContainerRef?.current || window
        const handleScroll = () => {
            const currentScrollY = scrollContainerRef?.current
                ? scrollContainerRef.current.scrollTop
                : window.scrollY
            if (currentScrollY > lastScrollY) {
                setHidden(true)
            } else {
                setHidden(false)
            }
            setLastScrollY(currentScrollY)
        }

        container.addEventListener("scroll", handleScroll)
        return () => container.removeEventListener("scroll", handleScroll)
    }, [lastScrollY, scrollContainerRef])

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
                    const isActive = activeScreen === item.id

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
