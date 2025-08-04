"use client"

import { useState, useRef, useEffect } from "react"
import { mockProducts } from "@/data/mockData"
import { MapScreenProps } from "@/types/index"
import ProductListPanel from "@/components/pages/map/ProductListPanel"
import MapPanel from "@/components/pages/map/MapPanel"
import MobileMapPanel from "@/components/pages/map/MobileMapPanel"
import BottomSheetProducts from "@/components/pages/map/BottomSheetProducts"
import ProductModal from "@/components/pages/map/ProductModal"


export default function MapScreen({ onNavigateHome, selectedCategory }: MapScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] & { description?: string }>(mockProducts[0])
  const [isBottomSheetExpanded, setIsBottomSheetExpanded] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFiltersDesktop, setShowFiltersDesktop] = useState(false)
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [visibleProducts, setVisibleProducts] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const mainScrollRef = useRef<HTMLDivElement>(null)
  const bottomSheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedCategory) {
      const filtered = mockProducts.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()),
      )
      setFilteredProducts(filtered.length > 0 ? filtered : mockProducts)
    }
  }, [selectedCategory])

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
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const isFavorite = (productId: number) => favorites.includes(productId)

  const openProductModal = (product: any) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
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

  const handleFiltersClick = () => {
    if (window.innerWidth < 1024) {
      setShowFiltersMobile((prev) => !prev)
    } else {
      setShowFiltersDesktop((prev) => !prev)
    }
  }

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

  return (
    <div ref={mainScrollRef} className="h-screen bg-[#F8FAFC] relative overflow-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-full">
        <ProductListPanel
          selectedCategory={selectedCategory ?? ""}
          showFilters={showFiltersDesktop}
          setShowFilters={setShowFiltersDesktop}
          sortBy={sortBy}
          handleSort={handleSort}
          filteredProducts={filteredProducts}
          visibleProducts={visibleProducts}
          loadMoreProducts={loadMoreProducts}
          isLoading={isLoading}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          openProductModal={openProductModal}
        />
        <MapPanel />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden h-full relative ">
        <MobileMapPanel />
        <BottomSheetProducts
          bottomSheetRef={bottomSheetRef}
          isBottomSheetExpanded={isBottomSheetExpanded}
          setIsBottomSheetExpanded={setIsBottomSheetExpanded}
          showFiltersMobile={showFiltersMobile}
          setShowFiltersMobile={setShowFiltersMobile}
          handleFiltersClick={handleFiltersClick}
          sortBy={sortBy}
          handleSort={handleSort}
          filteredProducts={filteredProducts}
          visibleProducts={visibleProducts}
          loadMoreProducts={loadMoreProducts}
          isLoading={isLoading}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          openProductModal={openProductModal}
          selectedCategory={selectedCategory ?? ""}
        />
      </div>

      <ProductModal
        isOpen={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        product={selectedProduct}
        images={getProductImages(selectedProduct)}
        currentIndex={currentImageIndex}
        nextImage={nextImage}
        prevImage={prevImage}
      />
    </div>
  )
}
