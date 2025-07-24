"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import ProductCard from "@/components/common/ProductCard"
import { mockProducts } from "@/data/mockData"

export default function FavoritesScreen() {
  const favoriteProducts = mockProducts.slice(0, 6) // Mock favorites

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-bold">Mis Favoritos</h1>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} showFavorite />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No tienes favoritos aún</h3>
            <p className="text-gray-500">Explora productos y guarda tus favoritos aquí</p>
          </div>
        )}
      </div>
    </div>
  )
}
