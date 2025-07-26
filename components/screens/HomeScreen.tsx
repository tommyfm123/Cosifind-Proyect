"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { mockPromotions, mockCategories, mockProducts } from "@/data/mockData"
import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"

export default function HomeScreen() {
  const [currentCategoryPage, setCurrentCategoryPage] = useState(0)

  const promotionColors = [
    { gradient: "from-purple-600 via-pink-600 to-red-600", accent: "bg-pink-500" },
    { gradient: "from-blue-600 via-cyan-500 to-teal-500", accent: "bg-cyan-500" },
    { gradient: "from-orange-500 via-red-500 to-pink-500", accent: "bg-orange-500" },
    { gradient: "from-green-500 via-emerald-500 to-teal-600", accent: "bg-emerald-500" },
  ]

  // Desktop: 2 filas de 8 (16 por página), Mobile: 2 filas de 4 (8 por página)
  const categoriesPerPage = window.innerWidth >= 768 ? 16 : 8
  const totalPages = Math.ceil(mockCategories.length / categoriesPerPage)

  const getCurrentCategories = () => {
    const start = currentCategoryPage * categoriesPerPage
    return mockCategories.slice(start, start + categoriesPerPage)
  }

  const nextPage = () => {
    setCurrentCategoryPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentCategoryPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Content */}
      <div className="pb-32">
        {/* Promotions Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="py-6 px-4 sm:px-6"
        >
          <h2 className="text-xl font-bold mb-4 px-2">Promociones de la semana</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 md:flex-wrap md:justify-center">
            {mockPromotions.map((promo, index) => {
              const colors = promotionColors[index % promotionColors.length]
              return (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 snap-start md:w-72"
                >
                  <Card className="overflow-hidden shadow-lg border-0 hover:shadow-xl transition-shadow">
                    <CardContent className="p-0 relative">
                      <div className={`h-40 bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <Badge className={`mb-2 ${colors.accent} text-white border-none`}>
                            {index === 0 ? "70% OFF" : index === 1 ? "NUEVO" : index === 2 ? "HOT" : "ESPECIAL"}
                          </Badge>
                          <h3 className="font-bold text-xl mb-1">{promo.title}</h3>
                          <p className="text-sm opacity-90">{promo.subtitle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-6 px-4 sm:px-6"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl font-bold">Categorías destacadas</h2>
              <p className="text-sm text-gray-600">Explora por categoría</p>
            </div>
            {/* Navigation buttons - only desktop */}
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" onClick={prevPage} className="rounded-full bg-transparent">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextPage} className="rounded-full bg-transparent">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {getCurrentCategories().map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0"
              >
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto p-3 w-full rounded-2xl bg-white hover:bg-gray-50 border-gray-200 hover:shadow-sm transition-all"
                >
                  {(() => {
                    const Icon = category.icon
                    return <Icon className="w-5 h-5" />
                  })()}
                  <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Page indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategoryPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentCategoryPage ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Nearby Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-6 px-4 sm:px-6"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl font-bold">Productos destacados</h2>
              <p className="text-sm text-gray-600">Los más populares cerca de ti</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Ver todos
            </Button>
          </div>

          <div className="space-y-4">
            {mockProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 sm:w-20 sm:h-32 md:w-20 md:h-20 rounded-xl object-cover"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.seller}</p>

                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span className="text-sm">{product.distance}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-blue-600">${product.price}</span>
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600">Envío gratis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
