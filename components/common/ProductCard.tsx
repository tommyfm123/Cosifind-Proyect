"use client"

import { motion } from "framer-motion"
import { Heart, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  seller: string
  price: number
  image: string
  distance: string
  rating: number
  category: string
  coordinates: [number, number]
}

interface ProductCardProps {
  product: Product
  showFavorite?: boolean
}

export default function ProductCard({ product, showFavorite = false }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="relative">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
        {showFavorite && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </Button>
        )}
        <Badge className="absolute top-3 left-3 bg-blue-500">{product.category}</Badge>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.seller}</p>

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

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <Button size="sm" className="rounded-full">
            Ver detalles
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
