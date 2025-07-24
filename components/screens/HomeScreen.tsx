"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, MapPin, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { mockPromotions, mockCategories, mockProducts } from "@/data/mockData"
import Footer from "@/components/common/Footer"

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("")

  const promotionDesigns = [
    { gradient: "from-purple-600 via-pink-600 to-red-600", pattern: "diagonal-stripes" },
    { gradient: "from-blue-600 via-cyan-500 to-teal-500", pattern: "dots" },
    { gradient: "from-orange-500 via-red-500 to-pink-500", pattern: "waves" },
    { gradient: "from-green-500 via-emerald-500 to-teal-600", pattern: "geometric" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Search Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué estás buscando?"
                className="pl-10 pr-4 py-3 text-base rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm bg-white"
              />
            </div>
          </div>
        </div>
      </div>

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
              const design = promotionDesigns[index % promotionDesigns.length]
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
                      <div className={`h-40 bg-gradient-to-br ${design.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        {/* Pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                          {design.pattern === "diagonal-stripes" && (
                            <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent transform rotate-45" />
                          )}
                          {design.pattern === "dots" && (
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                              }}
                            />
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <Badge className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
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
          <h2 className="text-xl font-bold mb-4 px-2">Categorías destacadas</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {Array.from({ length: Math.ceil(mockCategories.length / 4) }, (_, groupIndex) => (
              <div key={groupIndex} className="flex-shrink-0 grid grid-cols-2 gap-3 w-48">
                {mockCategories.slice(groupIndex * 4, (groupIndex + 1) * 4).map((category, index) => (
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
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  </motion.div>
                ))}
              </div>
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
                <Card className="overflow-hidden shadow-md border border-gray-100 bg-gradient-to-r from-blue-50/30 to-purple-50/30 hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-xl object-cover"
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
