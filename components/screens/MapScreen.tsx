"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Star, Heart, ArrowLeft, Eye, MessageCircle, Map } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockProducts } from "@/data/mockData"
import Header from "@/components/common/Header"
import Footer from "@/components/common/Footer"

interface MapScreenProps {
  onNavigateHome?: () => void
  selectedCategory?: string
}

export default function MapScreen({ onNavigateHome }: MapScreenProps) {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0])
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const isFavorite = (productId: number) => favorites.includes(productId)

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome()
    }
  }

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const loadMoreProducts = () => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 6)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <Header activeScreen="home" />

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-grow">
        {/* Left Panel - Products List */}
        <div className="w-1/2 border-r bg-white flex flex-col overflow-hidden">
          <div className="p-6 flex flex-col flex-grow overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col items-start justify-start mb-4 gap-4">
              <Button
                className="bg-dark text-white backdrop-blur-sm rounded-full p-3 shadow-sm flex items-center gap-2 hover:bg-dark hover:shadow-sm focus:outline-none active:bg-dark"
                onClick={handleGoHome}
              >
                <ArrowLeft className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Inicio</span>
              </Button>

              <h2 className="text-[2rem] font-bold mb-4">Productos cercanos</h2>
            </div>

            <div className="space-y-4">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <motion.div
                  key={product.id}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow relative"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openProductModal(product)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(product.id)
                    }}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 w-8 h-8 hover:bg-white shadow-sm"
                  >
                    <Heart
                      className={`w-3 h-3 ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                        }`}
                    />
                  </Button>
                  <div className="flex gap-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-40 h-24 rounded-lg object-cover"
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

              {/* Load More Button */}
              {visibleProducts < filteredProducts.length && (
                <div className="text-center py-4">
                  <Button onClick={loadMoreProducts} disabled={isLoading} variant="outline">
                    {isLoading ? "Cargando..." : "Ver más productos"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="w-1/2">
          <iframe
            src="https://maps.google.com/maps?q=Tucuman%2C%20Argentina&z=13&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Aquí puedes dejar tu layout móvil si quieres */}
      </div>

      <Footer />
    </div>
  )
}
