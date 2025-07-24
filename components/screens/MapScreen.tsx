"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { mockProducts } from "@/data/mockData"

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0])
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false)
  const constraintsRef = useRef(null)

  return (
    <div className="h-screen bg-white relative overflow-hidden">
      {/* Fixed Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en el mapa..."
                className="pl-10 pr-4 py-3 text-base rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full pt-20">
        {/* Left Panel - Products List */}
        <div className="w-1/2 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Productos cercanos</h2>
            <div className="space-y-4">
              {mockProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex gap-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.seller}</p>
                      <p className="text-lg font-semibold text-blue-600">${product.price}</p>
                      <p className="text-xs text-gray-500">{product.distance}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Mapa Interactivo</h3>
            <p className="text-gray-500">Aquí se mostraría el mapa con los productos</p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-full">
        <div className="h-full pt-20 bg-gray-100 flex items-center justify-center" ref={constraintsRef}>
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Mapa Interactivo</h3>
            <p className="text-gray-500">Aquí se mostraría el mapa con los productos</p>
          </div>
        </div>

        {/* Bottom Sheet */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
          initial={{ y: "80%" }}
          animate={{ y: isBottomSheetExpanded ? "20%" : "80%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) {
              setIsBottomSheetExpanded(false)
            } else if (info.offset.y < -100) {
              setIsBottomSheetExpanded(true)
            }
          }}
        >
          <div className="p-4">
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            {/* Product Info */}
            <div className="flex gap-4 mb-4">
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                <p className="text-gray-600">{selectedProduct.seller}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{selectedProduct.rating}</span>
                  <span className="text-sm text-gray-500">• {selectedProduct.distance}</span>
                </div>
                <p className="text-xl font-bold text-blue-600 mt-1">${selectedProduct.price}</p>
              </div>
            </div>

            {isBottomSheetExpanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Más productos similares</h4>
                  <div className="flex gap-3 overflow-x-auto">
                    {mockProducts.slice(1, 4).map((product) => (
                      <Card key={product.id} className="flex-shrink-0 w-32">
                        <CardContent className="p-2">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-20 object-cover rounded mb-2"
                          />
                          <p className="text-xs font-medium truncate">{product.name}</p>
                          <p className="text-xs text-blue-600">${product.price}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
