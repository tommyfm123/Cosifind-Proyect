import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SortAsc } from "lucide-react"

interface FavoritesHeaderProps {
    showFilters: boolean
    setShowFilters: (v: boolean) => void
}

export default function FavoritesHeader({ showFilters, setShowFilters }: FavoritesHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500" />
                <h1 className="text-2xl font-bold text-[#2D3844]">Mis Favoritos</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                >
                    <SortAsc className="w-4 h-4" />
                    Ordenar
                </Button>
            </div>
        </div>
    )
}
