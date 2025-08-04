"use client"

import React, { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Truck } from "lucide-react"
import { Product } from "@/types"


interface ProductsSectionProps {
    products: Product[]
    onShowAllProducts?: () => void
}

export default function ProductsSection({ products, onShowAllProducts }: ProductsSectionProps) {
    const productsCarouselRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const productsPerPage = 5
    const totalPages = Math.ceil(products.length / productsPerPage)

    const next = () => {
        setCurrentIndex((prev) => Math.min(prev + productsPerPage, (totalPages - 1) * productsPerPage))
    }

    const prev = () => {
        setCurrentIndex((prev) => Math.max(prev - productsPerPage, 0))
    }

    const getCurrentProducts = () => {
        return products.slice(currentIndex, currentIndex + productsPerPage)
    }

    return (
        <div className="px-4 py-20 md:px-16 lg:px-32 bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-2 gap-4">
                <div>
                    <h2 className="text-2xl sm:text-4xl font-light text-[#1B2A41] mb-2 sm:mb-4">Productos mas vistos</h2>
                    <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-4">Descubri los prodcuctos mas buscados cerca tuyo!</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-[10px] bg-white"
                    onClick={onShowAllProducts}
                >
                    Ver todos
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 ">
                {getCurrentProducts().map((product) => (
                    <div key={product.id} className="cursor-pointer" onClick={onShowAllProducts}>
                        <div className="relative m-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 shadow-md" onClick={onShowAllProducts}>
                            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                                <img className="object-cover w-full h-full" src={product.image || "/placeholder.svg"} alt={product.name} />
                                <Badge className="absolute top-3 left-3 bg-dark text-white text-xs">{product.category}</Badge>
                            </div>
                            <div className="mt-4 px-5 pb-5">
                                <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}