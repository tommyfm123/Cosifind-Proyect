// /types/index.ts

export interface Product {
    id: number
    name: string
    seller: string
    price: number
    image?: string
    distance: string
    rating: number
    category: string
    coordinates: [number, number]
}

export interface ProductType {
    id: number
    name: string
    image?: string
    seller: string
    rating: number
    distance: string
    price: number
}

export interface MapScreenProps {
    onNavigateHome: () => void
    selectedCategory?: string
    onSearchChange?: (query: string) => void
    searchQuery: string
}