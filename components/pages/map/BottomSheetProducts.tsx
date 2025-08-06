import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, SortAsc, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/data/mockData"
import { useEffect } from "react"

interface BottomSheetProductsProps {
    bottomSheetRef: React.RefObject<HTMLDivElement | null>
    isBottomSheetExpanded: boolean
    setIsBottomSheetExpanded: (expanded: boolean) => void
    showFiltersMobile: boolean
    setShowFiltersMobile: (show: boolean) => void
    handleFiltersClick: () => void
    sortBy: string
    handleSort: (criteria: string) => void
    filteredProducts: typeof mockProducts
    visibleProducts: number
    loadMoreProducts: () => void
    isLoading: boolean
    isFavorite: (productId: number) => boolean
    toggleFavorite: (productId: number) => void
    openProductModal: (product: any) => void
    selectedCategory: string
}

export default function BottomSheetProducts({
    bottomSheetRef,
    isBottomSheetExpanded,
    setIsBottomSheetExpanded,
    showFiltersMobile,
    setShowFiltersMobile,
    handleFiltersClick,
    sortBy,
    handleSort,
    filteredProducts,
    visibleProducts,
    loadMoreProducts,
    isLoading,
    isFavorite,
    toggleFavorite,
    openProductModal,
    selectedCategory,
}: BottomSheetProductsProps) {
    // Bloquear el scroll de la página cuando el bottom sheet está expandido
    useEffect(() => {
        if (isBottomSheetExpanded) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isBottomSheetExpanded])

    return (
        <motion.div
            ref={bottomSheetRef}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl flex flex-col"
            initial={{ y: "70%" }}
            animate={{ y: isBottomSheetExpanded ? "10%" : "70%" }}
            transition={{ type: "spring", damping: 12, stiffness: 80, mass: 0.7, velocity: 2 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.45}
            dragMomentum={true}
            onDragEnd={(_, info) => {
                if (info.offset.y > 100) setIsBottomSheetExpanded(false)
                else if (info.offset.y < -100) setIsBottomSheetExpanded(true)
            }}
            style={{ paddingBottom: "env(safe-area-inset-bottom)", minHeight: "40vh", maxHeight: "80vh", zIndex: 30 }}
        >
            <div className="flex flex-col items-center p-3 border-b border-gray-200 select-none">
                <div className="w-12 h-1 bg-gray-300 rounded-full mb-3" />
                <Button size="sm" variant="outline" onClick={handleFiltersClick} className="w-[150px]">
                    <SortAsc className="w-4 h-4" />
                    ordenar
                </Button>
                {showFiltersMobile && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="w-full mt-3 bg-white rounded-2xl p-4 z-40">
                        <h3 className="font-medium mb-3 text-[#2D3844]">Ordenar por:</h3>
                        <div className="flex justify-start flex-wrap gap-2">
                            <Button variant={sortBy === "relevance" ? "default" : "outline"} size="sm" onClick={() => handleSort("relevance")} className={sortBy === "relevance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Relevancia</Button>
                            <Button variant={sortBy === "distance" ? "default" : "outline"} size="sm" onClick={() => handleSort("distance")} className={sortBy === "distance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Cercanía</Button>
                            <Button variant={sortBy === "price" ? "default" : "outline"} size="sm" onClick={() => handleSort("price")} className={sortBy === "price" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Precio</Button>
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="overflow-y-auto px-4 pb-6" style={{ maxHeight: "calc(80vh - 64px)" }}>
                <h3 className="font-semibold text-lg mb-4 text-[#2D3844]">
                    {selectedCategory ? `Productos de ${selectedCategory}` : "Productos encontrados"}
                </h3>
                <div className="space-y-4">
                    {filteredProducts.slice(0, visibleProducts).map((product) => (
                        <Card key={product.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-[#F8FAFC]" onClick={() => openProductModal(product)}>
                            <CardContent className="p-4">
                                <div className="flex gap-4 relative">
                                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-full p-2 w-8 h-8 hover:bg-white shadow-sm z-10">
                                        <Heart className={`w-3 h-3 ${isFavorite(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                                    </Button>
                                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
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
                                            <Badge variant="secondary" className="text-xs bg-[#1B8FF]/30 text-[#1B8FF]">{product.category}</Badge>
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
    )
}
