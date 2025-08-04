import { Button } from "@/components/ui/button"
import { Heart, SortAsc } from "lucide-react"
import { motion } from "framer-motion"

interface ProductListPanelProps {
    selectedCategory?: string
    showFilters: boolean
    setShowFilters: (v: boolean) => void
    sortBy: string
    handleSort: (criteria: string) => void
    filteredProducts: any[]
    visibleProducts: number
    loadMoreProducts: () => void
    isLoading: boolean
    isFavorite: (id: number) => boolean
    toggleFavorite: (id: number) => void
    openProductModal: (product: any) => void
}

export default function ProductListPanel({
    selectedCategory,
    showFilters,
    setShowFilters,
    sortBy,
    handleSort,
    filteredProducts,
    visibleProducts,
    loadMoreProducts,
    isLoading,
    isFavorite,
    toggleFavorite,
    openProductModal,
}: ProductListPanelProps) {
    return (
        <div className="w-1/2 bg-white border-r overflow-y-auto">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#2D3844]">
                        {selectedCategory ? `${selectedCategory} - Productos cercanos` : "Productos cercanos"}
                    </h2>
                    <Button onClick={() => setShowFilters(!showFilters)} size="sm" variant="outline">
                        <SortAsc className="w-4 h-4" />
                        ordenar
                    </Button>
                </div>
                {showFilters && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 w-full rounded-2xl border p-4">
                        <div className="flex flex-wrap gap-2">
                            <Button variant={sortBy === "relevance" ? "default" : "outline"} size="sm" onClick={() => handleSort("relevance")} className={sortBy === "relevance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Relevancia</Button>
                            <Button variant={sortBy === "distance" ? "default" : "outline"} size="sm" onClick={() => handleSort("distance")} className={sortBy === "distance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Cercanía</Button>
                            <Button variant={sortBy === "price" ? "default" : "outline"} size="sm" onClick={() => handleSort("price")} className={sortBy === "price" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Precio</Button>
                        </div>
                    </motion.div>
                )}
                <div className="space-y-4">
                    {filteredProducts.slice(0, visibleProducts).map((product) => (
                        <div key={product.id} className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow relative bg-[#F8FAFC]" onClick={() => openProductModal(product)}>
                            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 w-8 h-8 hover:bg-white shadow-sm">
                                <Heart className={`w-3 h-3 ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                            </Button>
                            <div className="flex gap-4">
                                <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-medium text-[#2D3844]">{product.name}</h3>
                                    <p className="text-sm text-gray-600">{product.seller}</p>
                                    <p className="text-lg font-semibold text-[#1B8FF]">${product.price}</p>
                                    <p className="text-xs text-gray-500">{product.distance}</p>
                                </div>
                            </div>
                        </div>
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
        </div>
    )
}
