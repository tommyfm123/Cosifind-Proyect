import { AnimatePresence, motion } from "framer-motion"
import { Heart, MapPin, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type Product = {
    id: number
    name: string
    image: string
    category: string
    seller: string
    rating: number
    distance: string
    price: number
}

interface FavoritesGridProps {
    favoriteProducts: Product[]
    removeFavorite: (id: number) => void
    openProductDetails: (product: Product) => void
}

export default function FavoritesGrid({ favoriteProducts, removeFavorite, openProductDetails }: FavoritesGridProps) {
    if (favoriteProducts.length === 0) {
        return (
            <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No tienes favoritos aún</h3>
                <p className="text-gray-500">Explora productos y guarda tus favoritos aquí</p>
                <Button className="mt-4 bg-[#1B8FF] hover:bg-[#1B8FF]/90">Explorar productos</Button>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence>
                {favoriteProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative m-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                    >
                        <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#" onClick={(e) => { e.preventDefault(); openProductDetails(product) }}>
                            <img className="object-cover w-full h-full" src={product.image || "/placeholder.svg"} alt={product.name} />
                            <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFavorite(product.id) }} className="absolute top-2 right-2 bg-white backdrop-blur-sm rounded-full p-2 w-8 h-8 hover:bg-white shadow-xl">
                                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            </Button>
                        </a>
                        <div className="mt-4 px-5 pb-5">
                            <a href="#" onClick={(e) => { e.preventDefault(); openProductDetails(product) }}>
                                <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                            </a>
                            <p className="text-gray-600 text-sm mb-2">{product.seller}</p>
                            <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} aria-hidden="true" className={`h-5 w-5 ${i < Math.round(product.rating) ? "text-yellow-300" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                                <span className="ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="mb-5">
                                <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                            </div>
                            <Button size="sm" className="w-full rounded-md bg-slate-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-2 mt-2" onClick={() => openProductDetails(product)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Ver detalles
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
