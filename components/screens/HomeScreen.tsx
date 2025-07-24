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

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-white">
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
                className="pl-10 pr-4 py-3 text-base rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-24">
        {/* Promotions Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="py-6 px-4"
        >
          <h2 className="text-xl font-bold mb-4 px-2">Promociones de la semana</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
            {mockPromotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-start"
              >
                <Card className="overflow-hidden shadow-lg border-0">
                  <CardContent className="p-0 relative">
                    <div className={`h-40 bg-gradient-to-br ${promo.color} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-bold text-xl mb-1">{promo.title}</h3>
                        <p className="text-sm opacity-90">{promo.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-6 px-4"
        >
          <h2 className="text-xl font-bold mb-4 px-2">Categorías destacadas</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {mockCategories.slice(0, 16).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <Button
                  variant="outline"
                  className="flex flex-col items-center gap-2 h-auto p-4 min-w-[100px] rounded-2xl bg-white hover:bg-gray-50 border-gray-200"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-xs font-medium text-center">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nearby Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-6 px-4"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl font-bold">Productos cercanos</h2>
              <p className="text-sm text-gray-600">Basado en tus intereses</p>
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
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden shadow-sm border border-gray-100">
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
    </div>
  )
}
