"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Category {
    id: number  // Cambiado de string a number
    name: string
    icon: React.ElementType
    count: number
}

interface CategoriesSectionProps {
    categories: Category[]
    onNavigateToMap?: (category?: string) => void
}

export default function CategoriesSection({ categories, onNavigateToMap }: CategoriesSectionProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const categoriesPerPage = isMobile ? 6 : 16
    const totalPages = Math.ceil(categories.length / categoriesPerPage)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const getCurrentCategories = () => {
        const start = currentPage * categoriesPerPage
        return categories.slice(start, start + categoriesPerPage)
    }

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages)
    }

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        if (distance > 50) nextPage()
        if (distance < -50) prevPage()
    }

    const handleCategoryClick = (category: Category) => {
        if (onNavigateToMap) onNavigateToMap(category.name)
    }

    return (
        <div className="px-2 py-8 bg-gray-50 sm:px-4 sm:py-12 md:px-8 md:py-16 lg:px-16 lg:py-20 xl:px-32">
            <div className="flex flex-col items-start justify-between gap-4 px-2 mb-6 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-medium text-[#1B2A41] mb-2 sm:text-4xl sm:mb-4">Categorías destacadas</h2>
                    <p className="text-base text-gray-600 ">Explora por categoría</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={prevPage} disabled={totalPages <= 1}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextPage} disabled={totalPages <= 1}>
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
            <div className="relative overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4 sm:gap-3 sm:p-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
                        {getCurrentCategories().map((category, index) => (
                            <div key={category.id}>
                                <Card
                                    className={`cursor-pointer hover:shadow-sm transition-all duration-300 bg-white border border-gray-100 hover:border-[#1B8FF]/30 group rounded-lg ${index >= (isMobile ? 3 : 8) ? "hover:shadow-lg" : ""}`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <CardContent className="flex flex-col items-center justify-between h-full p-2 text-center sm:p-3 min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
                                        <div className="flex flex-col items-center justify-center flex-1">
                                            <div className={`text-xl mb-2 sm:text-2xl md:text-3xl ${index >= (isMobile ? 3 : 8) ? "group-hover:scale-110 transition-transform duration-200" : ""}`}>
                                                <category.icon />
                                            </div>
                                            <h3 className={`text-xs font-semibold leading-tight mb-2 line-clamp-2 sm:text-sm ${index >= (isMobile ? 3 : 8) ? "text-[#1B2A41]" : "text-black"}`}>
                                                {category.name}
                                            </h3>
                                        </div>
                                        <Badge variant="secondary" className={`text-xs bg-dark text-white ${index >= (isMobile ? 3 : 8) ? "" : "hover:bg-dark"}`}>
                                            {category.count}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentPage ? "bg-dark" : "bg-gray-300 hover:bg-gray-400"}`}
                    />
                ))}
            </div>
        </div>
    )
}
