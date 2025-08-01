"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ChevronLeft, ChevronRight, Star, SortAsc } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { mockProducts } from "@/data/mockData"

export interface MapScreenProps {
  onNavigateHome: () => void
  selectedCategory?: string
  searchQuery: string
  onSearchChange?: (value: string) => void
}

export default function MapScreen({ onNavigateHome, selectedCategory }: MapScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] & { description?: string }>(mockProducts[0])
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFiltersDesktop, setShowFiltersDesktop] = useState(false)
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)
  const mainScrollRef = useRef<HTMLDivElement>(null)

  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const bottomSheetRef = useRef<HTMLDivElement>(null)

  // Filtrar por categoría si viene
  useEffect(() => {
    if (selectedCategory) {
      const filtered = mockProducts.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      )
      setFilteredProducts(filtered.length > 0 ? filtered : mockProducts)
    }
  }, [selectedCategory])

  // Ordenar
  const handleSort = (criteria: string) => {
    setSortBy(criteria)
    const sorted = [...filteredProducts]

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
    // setShowFiltersDesktop(false)
    // setShowFiltersMobile(false)
  }

  // Favoritos toggle
  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }
  const isFavorite = (productId: number) => favorites.includes(productId)

  const handleGoHome = () => {
    if (onNavigateHome) onNavigateHome()
  }

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setIsProductModalOpen(true)
  }

  // Cargar más productos
  const loadMoreProducts = () => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 6)
      setIsLoading(false)
    }, 1000)
  }

  // Imágenes ficticias para carrusel
  const getProductImages = (product: any) => [
    product.image,
    "/placeholder.svg?height=400&width=400&text=Vista+2",
    "/placeholder.svg?height=400&width=400&text=Vista+3",
    "/placeholder.svg?height=400&width=400&text=Vista+4",
  ]
  const nextImage = () => {
    const images = getProductImages(selectedProduct)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  const prevImage = () => {
    const images = getProductImages(selectedProduct)
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Scroll infinito en bottom sheet
  useEffect(() => {
    const handleScroll = () => {
      if (!bottomSheetRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = bottomSheetRef.current
      if (scrollTop + clientHeight >= scrollHeight - 200) loadMoreProducts()
    }
    const bottomSheet = bottomSheetRef.current
    if (bottomSheet) {
      bottomSheet.addEventListener("scroll", handleScroll)
      return () => bottomSheet.removeEventListener("scroll", handleScroll)
    }
  }, [isLoading])

  const handleFiltersClick = () => {
    if (window.innerWidth < 1024) {
      setShowFiltersMobile((prev) => !prev)
    } else {
      setShowFiltersDesktop((prev) => !prev)
    }
  }

  return (
    <div ref={mainScrollRef} className="ref={mainScrollRef}h-screen bg-[#F8FAFC] relative overflow-auto">

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        {/* Panel productos */}
        <div className="w-1/2 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#2D3844]">
                {selectedCategory ? `${selectedCategory} - Productos cercanos` : "Productos cercanos"}
              </h2>
              <Button onClick={() => setShowFiltersDesktop((v) => !v)} size="sm" variant="outline">
                <SortAsc className="w-4 h-4" />
                ordenar
              </Button>
            </div>

            {/* Opciones de filtrado debajo del título */}
            {showFiltersDesktop && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 w-full  rounded-2xl  border p-4"
              >
                {/* <h3 className="font-medium mb-3 text-[#2D3844]">Ordenar por:</h3> */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={sortBy === "relevance" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("relevance")}
                    className={sortBy === "relevance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  >
                    Relevancia
                  </Button>
                  <Button
                    variant={sortBy === "distance" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("distance")}
                    className={sortBy === "distance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  >
                    Cercanía
                  </Button>
                  <Button
                    variant={sortBy === "price" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("price")}
                    className={sortBy === "price" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  >
                    Precio
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow relative bg-[#F8FAFC]"
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
                      <h3 className="font-medium text-[#2D3844]">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.seller}</p>
                      <p className="text-lg font-semibold text-[#1B8FF]">${product.price}</p>
                      <p className="text-xs text-gray-500">{product.distance}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Botón cargar más */}
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

        {/* Panel mapa con iframe */}
        <div className="w-1/2 bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3420.524731437716!2d-65.2352177848722!3d-26.83320218316185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c3c2e6b7e4d%3A0x662a961f1a31388!2sTucum%C3%A1n%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1689623385687!5m2!1ses-419!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-full relative ">
        {/* Mapa embebido */}
        <div className="h-[90vh] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3420.524731437716!2d-65.2352177848722!3d-26.83320218316185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c3c2e6b7e4d%3A0x662a961f1a31388!2sTucum%C3%A1n%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1689623385687!5m2!1ses-419!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Bottom Sheet */}
        <motion.div
          ref={bottomSheetRef}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl flex flex-col"
          initial={{ y: "70%" }}
          animate={{ y: isBottomSheetExpanded ? "10%" : "70%" }}
          transition={{
            type: "spring",
            damping: 12, // más suave
            stiffness: 80, // menos rígido
            mass: 0.7,
            velocity: 2,
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.45}
          dragMomentum={true}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) setIsBottomSheetExpanded(false)
            else if (info.offset.y < -100) setIsBottomSheetExpanded(true)
          }}
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
            minHeight: "40vh",
            maxHeight: "80vh",
            zIndex: 30,
          }}
        >

          {/* Drag Handle + Filtro */}
          <div className="flex flex-col items-center p-3 border-b border-gray-200 select-none">
            <div className="w-12 h-1 bg-gray-300 rounded-full mb-3" />
            <Button size="sm" variant="outline" onClick={handleFiltersClick} className="w-[150px]">
              <SortAsc className="w-4 h-4" />
              ordenar
            </Button>
            {showFiltersMobile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-3 bg-white rounded-2xl p-4 z-40"
              >
                <h3 className="font-medium mb-3 text-[#2D3844]">Ordenar por:</h3>
                <div className="flex justify-start flex-wrap gap-2">
                  <Button
                    variant={sortBy === "relevance" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("relevance")}
                    className={sortBy === "relevance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  >
                    Relevancia
                  </Button>
                  <Button
                    variant={sortBy === "distance" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("distance")}
                    className={sortBy === "distance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  >
                    Cercanía
                  </Button>
                  <Button
                    variant={sortBy === "price" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSort("price")}
                    className={sortBy === "price" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  >
                    Precio
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Productos scroll */}
          <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: "calc(80vh - 64px)" }}>
            <h3 className="font-semibold text-lg mb-4 text-[#2D3844]">
              {selectedCategory ? `Productos de ${selectedCategory}` : "Productos encontrados"}
            </h3>

            <div className="space-y-4">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-[#F8FAFC]"
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
                          className={`w-3 h-3 ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"
                            }`}
                        />
                      </Button>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-base mb-1 text-[#2D3844]">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.seller}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-sm text-gray-500">• {product.distance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-[#1B8FF]">${product.price}</span>
                          <Badge variant="secondary" className="text-xs bg-[#1B8FF]/30 text-[#1B8FF]">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {visibleProducts < filteredProducts.length && (
                <div className="text-center py-4">
                  <Button onClick={loadMoreProducts} disabled={isLoading} variant="outline">
                    {isLoading ? "Cargando..." : "Ver más productos"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal producto */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-3xl p-0">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>

          <div className="relative w-full h-96 bg-gray-100 flex items-center justify-center">
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>

            <img
              src={getProductImages(selectedProduct)[currentImageIndex]}
              alt={selectedProduct?.name}
              className="object-contain max-h-full"
            />

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="p-6">
            <p>{selectedProduct?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
