"use client"

import { useState } from "react"
import { mockProducts } from "@/data/mockData"
import FavoritesHeader from "@/components/pages/favorites/FavoritesHeader"
import FavoritesSortOptions from "@/components/pages/favorites/FavoritesSortOptions"
import FavoritesGrid, { Product } from "@/components/pages/favorites/FavoritesGrid"
import FavoriteProductModal from "@/components/pages/favorites/FavoriteProductModal"

export default function FavoritesScreen() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(mockProducts.slice(0, 6))
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [sortBy, setSortBy] = useState("recent")
  const [showFilters, setShowFilters] = useState(false)

  // Mock multiple images for carousel
  const getProductImages = (product: Product) => [
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
    if (!selectedProduct) return
    const images = getProductImages(selectedProduct)
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (!selectedProduct) return
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

  const handleSort = (criteria: string) => {
    setSortBy(criteria)
    const sorted = [...favoriteProducts]

    switch (criteria) {
      case "price":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "distance":
        sorted.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
        break
      default:
        // Keep original order for "recent"
        break
    }

    setFavoriteProducts(sorted)
    // setShowFilters(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="px-4 sm:px-6 py-6 pb-32">
        <FavoritesHeader showFilters={showFilters} setShowFilters={setShowFilters} />
        <FavoritesSortOptions showFilters={showFilters} sortBy={sortBy} handleSort={handleSort} />
        <FavoritesGrid
          favoriteProducts={favoriteProducts}
          removeFavorite={removeFavorite}
          openProductDetails={openProductDetails}
        />
      </div>
      <FavoriteProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProduct={selectedProduct}
        currentImageIndex={currentImageIndex}
        nextImage={nextImage}
        prevImage={prevImage}
        getProductImages={getProductImages}
        handleViewProduct={handleViewProduct}
        handleContactSeller={handleContactSeller}
        handleOpenMap={handleOpenMap}
      />
    </div>
  )
}