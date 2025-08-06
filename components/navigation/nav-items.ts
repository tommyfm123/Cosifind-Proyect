import { type LucideIcon, Home, Heart, MapPin, MessageCircle, User } from "lucide-react"

export interface NavItem {
  id: string
  icon: LucideIcon
  label: string
  path: string
}

export const authNavItems: NavItem[] = [
  { id: "home", icon: Home, label: "Inicio", path: "/" },
  { id: "favorites", icon: Heart, label: "Favoritos", path: "/favorites" },
  { id: "map", icon: MapPin, label: "Mapa", path: "/map" },
  { id: "messages", icon: MessageCircle, label: "Mensajes", path: "/messages" },
  { id: "profile", icon: User, label: "Perfil", path: "/profile" },
]

export const getGuestNavItems = (profileLabel = "Acceso"): NavItem[] => [
  { id: "home", icon: Home, label: "Inicio", path: "/" },
  { id: "map", icon: MapPin, label: "Mapa", path: "/map" },
  { id: "profile", icon: User, label: profileLabel, path: "/login" },
]
