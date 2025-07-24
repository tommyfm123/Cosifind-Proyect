"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Star, SlidersHorizontal, Heart, ArrowLeft, Eye, MessageCircle, Map } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockProducts } from "@/data/mockData"

interface MapScreenProps {
  onNavigateHome?: () => void
}

export default function MapScreen({ onNavigateHome }: MapScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0])
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const constraintsRef = useRef(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)

  const handleSort = (criteria: string) => {
    setSortBy(criteria)
    const sorted = [...mockProducts]

    switch (criteria) {
      case "distance":
        sorted.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
        break
      case "price":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "relevance":
      default:
        sorted.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredProducts(sorted)
    setShowFilters(false)
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
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

  // Auto-load more products when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (!bottomSheetRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = bottomSheetRef.current
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        loadMoreProducts()
      }
    }

    const bottomSheet = bottomSheetRef.current
    if (bottomSheet) {
      bottomSheet.addEventListener("scroll", handleScroll)
      return () => bottomSheet.removeEventListener("scroll", handleScroll)
    }
  }, [isLoading])

  return (
    <div className="h-screen bg-white relative overflow-hidden">
      {/* Back Button and Logo - Only on mobile map screen */}
      <div className="lg:hidden absolute top-4 left-4 right-4 z-50 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoHome}
          className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Inicio</span>
        </Button>

        {/* Logo */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          <span className="text-sm font-bold text-blue-600">LocalMarket</span>
        </div>
      </div>

      {/* Fixed Search Bar with Background */}
      <div className="absolute top-16 lg:top-4 left-4 right-4 z-40">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <div className="flex gap-3 max-w-md mx-auto lg:max-w-none">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en el mapa..."
                className="pl-10 pr-4 py-3 text-base rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm bg-white"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full px-4 bg-white shadow-sm"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Filters Menu */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-white rounded-2xl shadow-lg border p-4"
            >
              <h3 className="font-medium mb-3">Ordenar por:</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortBy === "relevance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSort("relevance")}
                >
                  Relevancia
                </Button>
                <Button
                  variant={sortBy === "distance" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSort("distance")}
                >
                  Cercanía
                </Button>
                <Button
                  variant={sortBy === "price" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSort("price")}
                >
                  Precio
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full pt-32">
        {/* Left Panel - Products List */}
        <div className="w-1/2 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Productos cercanos</h2>
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
                      className={`w-3 h-3 ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                    />
                  </Button>
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
        <div className="h-full pt-40 bg-gray-100 flex items-center justify-center" ref={constraintsRef}>
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Mapa Interactivo</h3>
            <p className="text-gray-500">Aquí se mostraría el mapa con los productos</p>
          </div>
        </div>

        {/* Bottom Sheet - 70% map, 30% visible */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
          initial={{ y: "70%" }}
          animate={{ y: isBottomSheetExpanded ? "20%" : "70%" }}
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
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="p-4 pb-8">
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

            {/* Products Grid */}
            <div ref={bottomSheetRef} className="max-h-[60vh] overflow-y-auto scrollbar-hide">
              <h3 className="font-semibold text-lg mb-4">Productos encontrados</h3>

              <div className="grid grid-cols-1 gap-4">
                {filteredProducts.slice(0, visibleProducts).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => openProductModal(product)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4 relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(product.id)
                            }}
                            className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-full p-2 w-8 h-8 hover:bg-white shadow-sm z-10"
                          >
                            <Heart
                              className={`w-3 h-3 ${
                                isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                              }`}
                            />
                          </Button>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-base mb-1">{product.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{product.seller}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{product.rating}</span>
                              <span className="text-sm text-gray-500">• {product.distance}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-blue-600">${product.price}</span>
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              )}

              {/* Load More Button */}
              {!isLoading && visibleProducts < filteredProducts.length && (
                <div className="text-center py-4">
                  <Button onClick={loadMoreProducts} variant="outline" className="w-full bg-transparent">
                    Ver más productos
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Detalles del producto</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              <img
                src={selectedProduct.image || "/placeholder.svg"}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-lg"
              />

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
                <Button className="w-full flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Ver producto completo
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <MessageCircle className="w-4 h-4" />
                    Contactar
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
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
