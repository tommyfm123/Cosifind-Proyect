import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Star, MapPin, Eye, MessageCircle, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "./FavoritesGrid"

interface FavoriteProductModalProps {
    isModalOpen: boolean
    setIsModalOpen: (open: boolean) => void
    selectedProduct: Product | null
    currentImageIndex: number
    nextImage: () => void
    prevImage: () => void
    getProductImages: (product: Product) => string[]
    handleViewProduct: () => void
    handleContactSeller: () => void
    handleOpenMap: () => void
}

export default function FavoriteProductModal({
    isModalOpen,
    setIsModalOpen,
    selectedProduct,
    currentImageIndex,
    nextImage,
    prevImage,
    getProductImages,
    handleViewProduct,
    handleContactSeller,
    handleOpenMap,
}: FavoriteProductModalProps) {
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-[#2D3844]">Detalles del producto</DialogTitle>
                </DialogHeader>
                {selectedProduct && (
                    <div className="space-y-4">
                        <div className="relative bg-white flex items-center justify-center" style={{ height: "200px" }}>
                            <img src={getProductImages(selectedProduct)[currentImageIndex] || "/placeholder.svg"} alt={selectedProduct.name} className="object-contain w-full h-full" />
                            <Button variant="ghost" size="sm" onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                {getProductImages(selectedProduct).map((_, index) => (
                                    <div key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-[#1B2A56]" : "bg-[#1B2A56]/50"}`} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-[#2D3844]">{selectedProduct.name}</h3>
                            <p className="text-gray-600 mb-3">Producto de alta calidad disponible en {selectedProduct.seller}. Perfecto para tus necesidades diarias con la mejor relación calidad-precio.</p>
                            <div className="flex items-center gap-4 mb-3">
                                <span className="text-2xl font-bold text-[#1B8FF]">${selectedProduct.price}</span>
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
                            <Button onClick={handleViewProduct} className="w-full flex items-center gap-2 bg-[#1B2A56] text-white hover:bg-[#24346b]">
                                <Eye className="w-4 h-4" />
                                Ver producto
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" onClick={handleContactSeller} className="flex items-center gap-2 bg-transparent hover:bg-gray-100">
                                    <MessageCircle className="w-4 h-4" />
                                    Contactar
                                </Button>
                                <Button variant="outline" onClick={handleOpenMap} className="flex items-center gap-2 bg-transparent hover:bg-gray-100">
                                    <Map className="w-4 h-4" />
                                    Abrir mapa
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
