"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Star, Truck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import MapScreen from "@/components/screens/MapScreen"
import MessagesScreen from "@/components/screens/MessagesScreen"
import ProfileScreen from "@/components/screens/ProfileScreen"
import FavoritesScreen from "@/components/screens/FavoritesScreen"
import FloatingNavigation from "@/components/navigation/FloatingNavigation"
import Header from "@/components/common/Header"

// Datos de ejemplo para promociones estilo Amazon
const promotions = [
  {
    id: 1,
    title: "Ofertas del Día",
    subtitle: "Hasta 70% de descuento",
    image: "/placeholder.svg?height=200&width=400&text=Electronics+Sale",
    discount: "70% OFF",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    title: "Prime Day",
    subtitle: "Envío gratis en millones de productos",
    image: "/placeholder.svg?height=200&width=400&text=Prime+Day",
    discount: "PRIME",
    color: "from-orange-500 to-red-600",
  },
  {
    id: 3,
    title: "Tecnología",
    subtitle: "Los últimos gadgets",
    image: "/placeholder.svg?height=200&width=400&text=Tech+Gadgets",
    discount: "NUEVO",
    color: "from-purple-600 to-indigo-700",
  },
  {
    id: 4,
    title: "Hogar y Jardín",
    subtitle: "Renueva tu espacio",
    image: "/placeholder.svg?height=200&width=400&text=Home+Garden",
    discount: "50% OFF",
    color: "from-green-600 to-teal-700",
  },
]

// 32 categorías estilo Amazon
const categories = [
  { id: 1, name: "Electrónicos", icon: "📱", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: 2, name: "Computadoras", icon: "💻", color: "bg-slate-50 text-slate-700 border-slate-200" },
  { id: 3, name: "Hogar", icon: "🏠", color: "bg-green-50 text-green-700 border-green-200" },
  { id: 4, name: "Jardín", icon: "🌱", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: 5, name: "Deportes", icon: "⚽", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { id: 6, name: "Automóvil", icon: "🚗", color: "bg-red-50 text-red-700 border-red-200" },
  { id: 7, name: "Ropa", icon: "👕", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: 8, name: "Zapatos", icon: "👟", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { id: 9, name: "Belleza", icon: "💄", color: "bg-pink-50 text-pink-700 border-pink-200" },
  { id: 10, name: "Salud", icon: "🏥", color: "bg-teal-50 text-teal-700 border-teal-200" },
  { id: 11, name: "Bebés", icon: "👶", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { id: 12, name: "Juguetes", icon: "🧸", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { id: 13, name: "Libros", icon: "📚", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: 14, name: "Música", icon: "🎵", color: "bg-violet-50 text-violet-700 border-violet-200" },
  { id: 15, name: "Películas", icon: "🎬", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  { id: 16, name: "Videojuegos", icon: "🎮", color: "bg-lime-50 text-lime-700 border-lime-200" },
  { id: 17, name: "Herramientas", icon: "🔧", color: "bg-stone-50 text-stone-700 border-stone-200" },
  { id: 18, name: "Oficina", icon: "🏢", color: "bg-gray-50 text-gray-700 border-gray-200" },
  { id: 19, name: "Mascotas", icon: "🐕", color: "bg-orange-50 text-orange-600 border-orange-200" },
  { id: 20, name: "Cocina", icon: "🍳", color: "bg-red-50 text-red-600 border-red-200" },
  { id: 21, name: "Baño", icon: "🛁", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { id: 22, name: "Muebles", icon: "🪑", color: "bg-brown-50 text-brown-700 border-brown-200" },
  { id: 23, name: "Decoración", icon: "🖼️", color: "bg-purple-50 text-purple-600 border-purple-200" },
  { id: 24, name: "Iluminación", icon: "💡", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  { id: 25, name: "Textiles", icon: "🧵", color: "bg-pink-50 text-pink-600 border-pink-200" },
  { id: 26, name: "Arte", icon: "🎨", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  { id: 27, name: "Instrumentos", icon: "🎸", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { id: 28, name: "Camping", icon: "⛺", color: "bg-green-50 text-green-600 border-green-200" },
  { id: 29, name: "Fitness", icon: "🏋️", color: "bg-orange-50 text-orange-500 border-orange-200" },
  { id: 30, name: "Viajes", icon: "✈️", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: 31, name: "Joyería", icon: "💎", color: "bg-violet-50 text-violet-600 border-violet-200" },
  { id: 32, name: "Relojes", icon: "⌚", color: "bg-slate-50 text-slate-600 border-slate-200" },
]

// Productos destacados estilo Amazon
const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "$1,199.00",
    originalPrice: "$1,299.00",
    location: "Tienda Apple - 1.2km",
    image: "/placeholder.svg?height=150&width=150&text=iPhone+15",
    rating: 4.8,
    reviews: 2847,
    store: "Apple Store",
    badge: "Más vendido",
    discount: 8,
  },
  {
    id: 2,
    name: "MacBook Air M3",
    price: "$1,099.00",
    originalPrice: "$1,199.00",
    location: "Best Buy - 0.8km",
    image: "/placeholder.svg?height=150&width=150&text=MacBook+Air",
    rating: 4.9,
    reviews: 1523,
    store: "Best Buy",
    badge: "Oferta del día",
    discount: 8,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: "$349.99",
    originalPrice: "$399.99",
    location: "Sony Store - 2.1km",
    image: "/placeholder.svg?height=150&width=150&text=Sony+Headphones",
    rating: 4.7,
    reviews: 892,
    store: "Sony Store",
    badge: "Envío gratis",
    discount: 13,
  },
  {
    id: 4,
    name: 'Samsung 65" QLED TV',
    price: "$899.99",
    originalPrice: "$1,199.99",
    location: "Samsung Plaza - 1.5km",
    image: "/placeholder.svg?height=150&width=150&text=Samsung+TV",
    rating: 4.6,
    reviews: 634,
    store: "Samsung Plaza",
    badge: "25% OFF",
    discount: 25,
  },
]

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  const handleNavigateHome = () => {
    setActiveScreen("home")
    setSelectedCategory(undefined)
  }

  const handleNavigateToMap = (category?: string) => {
    setSelectedCategory(category)
    setActiveScreen("map")
  }

  const handleShowAllProducts = () => {
    setSelectedCategory(undefined)
    setActiveScreen("map")
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return (
          <div className="min-h-screen bg-[#F8FAFC] pb-24 sm:pb-32">
            {/* Header con Search Bar */}
            <Header activeScreen="home" />

            {/* Carrusel de Promociones */}
            <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6">
              <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {promotions.map((promo, index) => (
                  <Card
                    key={promo.id}
                    className="flex-shrink-0 w-72 sm:w-80 md:w-96 snap-start shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-left border-0 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0 relative">
                      <div className={`h-32 sm:h-36 md:h-40 bg-gradient-to-br ${promo.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4">
                          <Badge className="mb-2 sm:mb-3 bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs sm:text-sm">
                            {promo.discount}
                          </Badge>
                          <h3 className="font-bold text-white text-lg sm:text-xl mb-1">{promo.title}</h3>
                          <p className="text-xs sm:text-sm text-white/90">{promo.subtitle}</p>
                        </div>
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                          <Button
                            size="sm"
                            className="bg-white text-gray-800 hover:bg-gray-100 text-xs sm:text-sm px-3 sm:px-4"
                            onClick={() => handleNavigateToMap(promo.title)}
                          >
                            Ver ofertas
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sección de Categorías */}
            <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D3844]">Explorar categorías</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Encuentra lo que necesitas</p>
              </div>

              {/* Carrusel de categorías */}
              <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {Array.from({ length: Math.ceil(categories.length / 8) }, (_, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex-shrink-0 w-full grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4 snap-start"
                  >
                    {categories.slice(groupIndex * 8, (groupIndex + 1) * 8).map((category, index) => (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className={`h-auto p-2 sm:p-3 md:p-4 flex flex-col items-center gap-1 sm:gap-2 md:gap-3 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom border ${category.color} bg-white shadow-sm hover:shadow-md min-h-[80px] sm:min-h-[90px] md:min-h-[100px]`}
                        style={{ animationDelay: `${(groupIndex * 8 + index) * 50}ms` }}
                        onClick={() => handleNavigateToMap(category.name)}
                      >
                        <span className="text-xl sm:text-2xl md:text-3xl">{category.icon}</span>
                        <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-center leading-tight">
                          {category.name}
                        </span>
                      </Button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Indicadores de página */}
              <div className="flex justify-center mt-4 sm:mt-6 gap-1 sm:gap-2">
                {Array.from({ length: Math.ceil(categories.length / 8) }, (_, index) => (
                  <div
                    key={index}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300 transition-colors duration-200"
                  />
                ))}
              </div>
            </div>

            {/* Productos Destacados */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 md:py-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D3844]">Productos destacados</h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Los más populares cerca de ti</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#1B8FF] hover:text-[#1B8FF]/80 text-xs sm:text-sm"
                  onClick={handleShowAllProducts}
                >
                  Ver todos
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {featuredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom border-0 shadow-md bg-white"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex sm:flex-col gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-20 h-20 sm:w-full sm:h-32 md:h-40 object-cover rounded-lg sm:rounded-xl"
                          />
                          {product.discount > 0 && (
                            <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs px-1 sm:px-2">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 sm:flex-none">
                          <Badge
                            variant="secondary"
                            className="mb-2 text-[10px] sm:text-xs bg-[#1B8FF]/10 text-[#1B8FF]"
                          >
                            {product.badge}
                          </Badge>
                          <h3 className="font-bold text-[#2D3844] mb-2 text-sm sm:text-base md:text-lg leading-tight">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg sm:text-xl font-bold text-[#2D3844]">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs sm:text-sm text-gray-500 line-through">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs sm:text-sm font-medium text-gray-700">{product.rating}</span>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{product.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                            <span className="text-[10px] sm:text-xs text-green-600 font-medium">Envío gratis</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )
      case "map":
        return <MapScreen onNavigateHome={handleNavigateHome} selectedCategory={selectedCategory} />
      case "messages":
        return <MessagesScreen />
      case "profile":
        return <ProfileScreen />
      case "favorites":
        return <FavoritesScreen />
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        <FloatingNavigation
          activeScreen={activeScreen}
          onScreenChange={setActiveScreen}
          hideOnMap={activeScreen === "map"}
        />
      </div>
    )
  }
}
