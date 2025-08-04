import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    product: any
    images: string[]
    currentIndex: number
    nextImage: () => void
    prevImage: () => void
}

export default function ProductModal({
    isOpen,
    onOpenChange,
    product,
    images,
    currentIndex,
    nextImage,
    prevImage,
}: ProductModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl p-0">
                <DialogHeader>
                    <DialogTitle>{product?.name}</DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-96 bg-gray-100 flex items-center justify-center">
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
                        <ChevronLeft />
                    </button>
                    <img src={images[currentIndex]} alt={product?.name} className="object-contain max-h-full" />
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
                        <ChevronRight />
                    </button>
                </div>
                <div className="p-6">
                    <p>{product?.description}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
