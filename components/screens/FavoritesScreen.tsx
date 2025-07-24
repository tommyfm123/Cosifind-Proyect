"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MapPin, Star, MessageCircle, Map, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockProducts } from "@/data/mockData"
import Footer from "@/components/common/Footer"

export default function FavoritesScreen() {
  const [favoriteProducts, setFavoriteProducts] = useState(mockProducts.slice(0, 6))
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock multiple images for carousel
  const getProductImages = (product: any) => [
    product.image,
    "/placeholder.svg?height=300&width=400&text=Vista+2",
    "/placeholder.svg?height=300&width=400&text=Vista+3",
    "/placeholder.svg?height=300&width=400&text=Vista+4",
  ]

  const removeFavorite = (productId: number) => {
    setFavoriteProducts((prev) => prev.filter((product) => product.id !== productId))
  }

  const openProductDetails = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }

  const nextImage = () => {
    const images = getProductImages(selectedProduct)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    const images = getProductImages(selectedProduct)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleViewProduct = () => {
    console.log("Ver producto completo")
    setIsModalOpen(false)
  }

  const handleContactSeller = () => {
    console.log("Contactar vendedor")
    setIsModalOpen(false)
  }

  const handleOpenMap = () => {
    console.log("Abrir en mapa")
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 py-6 pb-32">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold">Mis Favoritos</h1>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence>
              {favoriteProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Image at the top */}
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFavorite(product.id)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 w-10 h-10 hover:bg-white shadow-sm"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </Button>
                  </div>

                  {/* Content below image */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.seller}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{product.distance}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    </div>

                    <Button size="sm" className="w-full rounded-full" onClick={() => openProductDetails(product)}>
                      Ver detalles
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No tienes favoritos aún</h3>
            <p className="text-gray-500">Explora productos y guarda tus favoritos aquí</p>
          </div>
        )}
      </div>

      <Footer />

      {/* Product Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Detalles del producto</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              {/* Image Carousel */}
              <div className="relative">
                <img
                  src={getProductImages(selectedProduct)[currentImageIndex] || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {getProductImages(selectedProduct).map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 mb-3">
                  Producto de alta calidad disponible en {selectedProduct.seller}. Perfecto para tus necesidades diarias
                  con la mejor relación calidad-precio.
                </p>

                <div className="flex items-center gap-4 mb-3">
                  <span className="text-2xl font-bold text-blue-600">${selectedProduct.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{selectedProduct.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedProduct.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Av. Aconquija 1234, Tucumán</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Ver producto button - full width */}
                <Button onClick={handleViewProduct} className="w-full flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Ver producto
                </Button>

                {/* Contact and Map buttons - two columns */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={handleContactSeller}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contactar
                  </Button>
                  <Button variant="outline" onClick={handleOpenMap} className="flex items-center gap-2 bg-transparent">
                    <Map className="w-4 h-4" />
                    Abrir mapa
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
