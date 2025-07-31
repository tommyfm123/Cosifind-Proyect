"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Star, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import MapScreen from "@/app/map/page"
import MessagesScreen from "@/app/messages/page"
import ProfileScreen from "@/app/profile/page"
import FavoritesScreen from "@/app/favorites/page"
import BottomNavigationBar from "@/components/navigation/BottomNavigationBar"



import { AppleCardsCarousel } from '@/components/ui/apple-cards-carousel';

// Promociones estilo Apple
const applePromotions = [
  {
    src: "/images/tech.jpg",
    title: "Ofertas en Electrónica",
    category: "Semana de descuentos",
    content: <p>Aprovechá hasta 40% OFF en celulares, parlantes y más.</p>,
  },
  {
    src: "/images/gaming.jpg",
    title: "Gaming Days",
    category: "Promos Exclusivas",
    content: <p>Descuentos en consolas, accesorios y videojuegos.</p>,
  },
  {
    src: "/images/ropa.jpg",
    title: "Top Moda",
    category: "Tendencias",
    content: <p>Remeras, zapatillas y más con envíos gratis.</p>,
  },
  {
    src: "/images/deco.jpg",
    title: "Ofertas en Hogar",
    category: "Equipá tu casa",
    content: <p>Muebles, cocina y electro hasta 30% OFF.</p>,
  },
  {
    src: "/images/school.jpg",
    title: "Tecnología para el Estudio",
    category: "Regreso a clases",
    content: <p>Notebooks, tablets y más al mejor precio.</p>,
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
    image: "/images/macbookm3.jpg",
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
    image: "/images/macbookm3.jpg",
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
    image: "/images/macbookm3.jpg",
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
    image: "/images/macbookm3.jpg",
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
  // Estado para paginación de categorías
  const [categoryPage, setCategoryPage] = useState(0)
  const categoriesPerPage = 8
  const totalPages = Math.ceil(categories.length / categoriesPerPage)

  const handleNextPage = () => {
    if (categoryPage < totalPages - 1) {
      setCategoryPage(categoryPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (categoryPage > 0) {
      setCategoryPage(categoryPage - 1)
    }
  }


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
          <div className=" bg-[#F8FAFC] min-h-screen border-none">

            {/* Contenedor con padding lateral unificado */}
            <div className="relative py-8 bg-white px-10 gap-10 sm:px-2 md:px-28 lg:px-40 xl:px-52 2xl:px-64 ">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
                  Destacados de la semana
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed max-w-xl">
                  Seleccionamos lo mejor para vos. Tecnología, moda, hogar y más, con descuentos exclusivos por tiempo limitado.
                </p>

              </div>



              {/* Carousel con mismo padding lateral, sin margen negativo */}
              <div className="relative overflow-x-auto scroll-smooth px-0">
                <div>
                  <AppleCardsCarousel cards={applePromotions} />
                </div>
              </div>

              {/* Degradados laterales para ocultar bordes */}
              <div
                className="pointer-events-none absolute top-0 left-0 h-full w-12 sm:w-20 md:w-28 lg:w-36 xl:w-40 2xl:w-48"
                style={{ background: 'linear-gradient(to right, white, transparent)' }}
              />
              <div
                className="pointer-events-none absolute top-0 right-0 h-full w-12 sm:w-20 md:w-28 lg:w-36 xl:w-40 2xl:w-48"
                style={{ background: 'linear-gradient(to left, white, transparent)' }}
              />
            </div>


            {/* Sección de Categorías */}
            <div className="relative py-8 bg-gray-50 px-10 gap-10 sm:px-2 md:px-28 lg:px-40 xl:px-52 2xl:px-64 ">


              <div className="mb-4 sm:mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D3844]">Explorar categorías</h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Encuentra lo que necesitas</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-gray-300"
                    onClick={handlePrevPage}
                    disabled={categoryPage === 0}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border border-gray-300"
                    onClick={handleNextPage}
                    disabled={categoryPage === totalPages - 1}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Grid con las categorías actuales */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {categories
                  .slice(categoryPage * categoriesPerPage, (categoryPage + 1) * categoriesPerPage)
                  .map((category, index) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={`h-auto min-w-[85px] p-2 sm:p-3 md:p-4 flex flex-col items-center gap-1 sm:gap-4 md:gap-3 rounded-xl sm:rounded-2xl border ${category.color} bg-white shadow-sm hover:shadow-md min-h-[80px] sm:min-h-[90px] md:min-h-[100px]`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => handleNavigateToMap(category.name)}
                    >
                      <span className="text-xl sm:text-2xl md:text-3xl">{category.icon}</span>
                      <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-center leading-tight">
                        {category.name}
                      </span>
                    </Button>
                  ))}
              </div>

              {/* Paginación - indicadores */}
              <div className="flex justify-center mt-4 sm:mt-6 gap-1 sm:gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === categoryPage ? "bg-blue-500" : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Productos Destacados */}
            <div className="relative py-8 bg-white px-10 gap-10 sm:px-2 md:px-28 lg:px-40 xl:px-52 2xl:px-64 ">

              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D3844]">Productos destacados</h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Los más populares cerca de ti</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white text-[#1B8FF] border border-[#1B8FF] hover:bg-[#1B8FF]/10 text-xs sm:text-sm"
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
                    <CardContent className="p-4 sm:p-6 ">
                      <div className="flex sm:flex-col gap-3 sm:gap-4">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-20 h-20 sm:w-full sm:h-32 md:h-40 object-contain rounded-lg sm:rounded-xl"

                          />
                          {product.discount > 0 && (
                            <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs px-1 sm:px-2">
                              -{product.discount}%
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 sm:flex-none ">

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
    return null
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

      <BottomNavigationBar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
    </div>
  )
}
