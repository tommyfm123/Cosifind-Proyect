import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface FavoritesSortOptionsProps {
    showFilters: boolean
    sortBy: string
    handleSort: (criteria: string) => void
}

export default function FavoritesSortOptions({ showFilters, sortBy, handleSort }: FavoritesSortOptionsProps) {
    if (!showFilters) return null
    return (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-white rounded-2xl border p-4">
            <h3 className="font-medium mb-3 text-[#2D3844]">Ordenar por:</h3>
            <div className="flex flex-wrap gap-2">
                <Button variant={sortBy === "recent" ? "default" : "outline"} size="sm" onClick={() => handleSort("recent")} className={sortBy === "recent" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Más recientes</Button>
                <Button variant={sortBy === "price" ? "default" : "outline"} size="sm" onClick={() => handleSort("price")} className={sortBy === "price" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Precio</Button>
                <Button variant={sortBy === "rating" ? "default" : "outline"} size="sm" onClick={() => handleSort("rating")} className={sortBy === "rating" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Mejor valorados</Button>
                <Button variant={sortBy === "distance" ? "default" : "outline"} size="sm" onClick={() => handleSort("distance")} className={sortBy === "distance" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}>Cercanía</Button>
            </div>
        </motion.div>
    )
}
