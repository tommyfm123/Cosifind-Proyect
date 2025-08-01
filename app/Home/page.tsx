"use client"

import React from "react"
import { useState, useRef } from "react"
import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel"
import ProductSearchBar from "@/components/common/product-search-bar"
import {
    Star,
    MapPin,
    Truck,
    ChevronLeft,
    ChevronRight,
    Users,
    Shield,
    Clock,
    Award,
    TrendingUp,
    Zap,
    Store,
    Package,
    Heart,
    MessageCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockCategories, mockProducts } from "@/data/mockData"

// Promociones estilo Apple
const applePromotions = [
    {
        src: "/images/tech.jpg",
        title: "Ofertas en Electrónica",
        category: "Semana de descuentos",
        content: <p>Aprovechá hasta 40% OFF en celulares, parlantes y más.</p>,
    },
    {
        src: "/images/gaming.jpg",
        title: "Gaming Days",
        category: "Promos Exclusivas",
        content: <p>Descuentos en consolas, accesorios y videojuegos.</p>,
    },
    {
        src: "/images/ropa.jpg",
        title: "Top Moda",
        category: "Tendencias",
        content: <p>Remeras, zapatillas y más con envíos gratis.</p>,
    },
    {
        src: "/images/deco.jpg",
        title: "Ofertas en Hogar",
        category: "Equipá tu casa",
        content: <p>Muebles, cocina y electro hasta 30% OFF.</p>,
    },
    {
        src: "/images/school.jpg",
        title: "Tecnología para el Estudio",
        category: "Regreso a clases",
        content: <p>Notebooks, tablets y más al mejor precio.</p>,
    },
    {
        src: "/images/tech.jpg",
        title: "Ofertas en Electrónica",
        category: "Semana de descuentos",
        content: <p>Aprovechá hasta 40% OFF en celulares, parlantes y más.</p>,
    },
    {
        src: "/images/gaming.jpg",
        title: "Gaming Days",
        category: "Promos Exclusivas",
        content: <p>Descuentos en consolas, accesorios y videojuegos.</p>,
    },
    {
        src: "/images/ropa.jpg",
        title: "Top Moda",
        category: "Tendencias",
        content: <p>Remeras, zapatillas y más con envíos gratis.</p>,
    },
]

interface HomeScreenProps {
    onNavigateToMap?: (category?: string) => void
    onShowAllProducts?: () => void
    searchQuery: string
    onSearchChange: (value: string) => void
    isLoggedIn: boolean
}

export default function HomeScreen({
    onNavigateToMap,
    onShowAllProducts,
    searchQuery,
    onSearchChange,
    isLoggedIn,
}: HomeScreenProps) {
    // PROMOCIONES
    const [currentPromotion, setCurrentPromotion] = useState(0)
    const totalPromotions = applePromotions.length

    const nextPromotion = () => {
        setCurrentPromotion((prev) => (prev + 1) % totalPromotions)
    }
    const prevPromotion = () => {
        setCurrentPromotion((prev) => (prev - 1 + totalPromotions) % totalPromotions)
    }

    // CATEGORÍAS
    const [currentCategoryPage, setCurrentCategoryPage] = useState(0)
    // Detecta si es mobile usando window.innerWidth (solo client side)
    const [isMobile, setIsMobile] = useState(false)
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])
    const categoriesPerPage = isMobile ? 6 : 16
    const totalPages = Math.ceil(mockCategories.length / categoriesPerPage)

    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const getCurrentCategories = () => {
        const start = currentCategoryPage * categoriesPerPage
        return mockCategories.slice(start, start + categoriesPerPage)
    }

    const nextCategoryPage = () => {
        setCurrentCategoryPage((prev) => (prev + 1) % totalPages)
    }

    const prevCategoryPage = () => {
        setCurrentCategoryPage((prev) => (prev - 1 + totalPages) % totalPages)
    }

    // Touch handlers for mobile swipe
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
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            nextCategoryPage()
        }
        if (isRightSwipe) {
            prevCategoryPage()
        }
    }

    const handleCategoryClick = (category: any) => {
        if (onNavigateToMap) {
            onNavigateToMap(category.name)
        }
    }

    // PRODUCTOS DESTACADOS
    const [currentProductIndex, setCurrentProductIndex] = useState(0)
    const productsCarouselRef = useRef<HTMLDivElement>(null)
    const productsPerPage = 4
    const totalProductPages = Math.ceil(mockProducts.length / productsPerPage)

    const nextProducts = () => {
        setCurrentProductIndex((prev) =>
            Math.min(prev + productsPerPage, (totalProductPages - 1) * productsPerPage)
        )
    }

    const prevProducts = () => {
        setCurrentProductIndex((prev) =>
            Math.max(prev - productsPerPage, 0)
        )
    }

    const getCurrentProducts = () => {
        return mockProducts.slice(currentProductIndex, currentProductIndex + productsPerPage)
    }

    const handleViewAllProducts = () => {
        if (onShowAllProducts) {
            onShowAllProducts()
        }
    }

    const features = [
        {
            icon: Users,
            title: "Comunidad Local",
            description: "Conecta con vendedores de tu zona",
            color: "text-[#1B8FF]",
            bg: "bg-[#1B8FF]/10",
        },
        {
            icon: Shield,
            title: "Compra Segura",
            description: "Transacciones protegidas y verificadas",
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            icon: Clock,
            title: "Entrega Rápida",
            description: "Recibe tus productos el mismo día",
            color: "text-orange-600",
            bg: "bg-orange-50",
        },
        {
            icon: Award,
            title: "Calidad Garantizada",
            description: "Solo productos de la mejor calidad",
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ]

    const stats = [
        { number: "10K+", label: "Productos", icon: TrendingUp },
        { number: "5K+", label: "Vendedores", icon: Users },
        { number: "50K+", label: "Usuarios", icon: Zap },
        { number: "4.8", label: "Rating", icon: Star },
    ]

    const quickActions = [
        {
            icon: Store,
            title: "Tiendas Cercanas",
            description: "Encuentra tiendas en tu área",
            color: "text-[#1B8FF]",
            bg: "bg-[#1B8FF]/10",
        },
        {
            icon: Package,
            title: "Ofertas Flash",
            description: "Descuentos por tiempo limitado",
            color: "text-red-600",
            bg: "bg-red-50",
        },
        {
            icon: Heart,
            title: "Lista de Deseos",
            description: "Guarda productos para después",
            color: "text-pink-600",
            bg: "bg-pink-50",
        },
        {
            icon: MessageCircle,
            title: "Soporte 24/7",
            description: "Ayuda cuando la necesites",
            color: "text-green-600",
            bg: "bg-green-50",
        },
    ]

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#0f172a] via-[#4f46e5] to-[#1e293b] min-h-[92vh] flex items-center justify-center px-4 sm:px-6 md:px-12 py-10 sm:py-20 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-0" />
                <div className="relative z-10 max-w-5xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6">
                        Buscá productos cerca tuyo.
                    </h1>
                    <p className="text-base sm:text-lg md:text-2xl font-light text-white/90 mb-10 max-w-3xl mx-auto">
                        Compará precios, encontrá ofertas únicas y andá a comprarlo en persona.
                    </p>
                    <ProductSearchBar className="mt-4 max-w-full sm:max-w-2xl mx-auto" />
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <a
                            href="#"
                            className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white text-[#0f172a] font-medium shadow text-sm sm:text-base"
                        >
                            <img src="/images/icons/android.png" alt="Android" className="w-5 h-5" />
                            Android
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-white text-[#0f172a] font-medium shadow text-sm sm:text-base"
                        >
                            <img src="/images/icons/apple-logo.png" alt="Apple" className="w-5 h-5" />
                            iOS
                        </a>
                    </div>
                </div>
            </div>

            {/* Promotions Carousel */}
            <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
                <h2 className="text-2xl sm:text-4xl font-normal text-[#1B2A41]">Promociones de la semana</h2>
                <div className="relative overflow-x-auto scroll-smooth px-0">
                    <AppleCardsCarousel cards={applePromotions} />
                </div>
            </div>

            {/* Categories Section */}
            <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 px-2 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-4xl font-light text-[#1B2A41] mb-2 sm:mb-4">Categorías destacadas</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Explora por categoría</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={prevCategoryPage}
                            disabled={totalPages <= 1}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={nextCategoryPage}
                            disabled={totalPages <= 1}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <div
                    className="relative overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="space-y-4">
                        <div className="p-2 sm:p-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
                            {getCurrentCategories()
                                .map((category, index) => (
                                    <Card
                                        key={category.id}
                                        className={`cursor-pointer hover:shadow-sm transition-all duration-300 bg-white border border-gray-100 hover:border-[#1B8FF]/30 group ${index >= (isMobile ? 3 : 8) ? "hover:shadow-lg" : ""}`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <CardContent className="p-2 sm:p-3 flex flex-col items-center text-center h-full justify-between min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
                                            <div className="flex flex-col items-center flex-1 justify-center">
                                                <div className={`text-xl sm:text-2xl md:text-3xl mb-2 ${index >= (isMobile ? 3 : 8) ? "group-hover:scale-110 transition-transform duration-200" : ""}`}>
                                                    <category.icon />
                                                </div>
                                                <h3 className={`text-xs sm:text-sm font-semibold leading-tight mb-2 line-clamp-2 ${index >= (isMobile ? 3 : 8) ? "text-[#1B2A41]" : "text-black"}`}>
                                                    {category.name}
                                                </h3>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs bg-dark text-white ${index >= (isMobile ? 3 : 8) ? "" : "hover:bg-dark"}`}
                                            >
                                                {category.count}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4 sm:mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentCategoryPage(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentCategoryPage ? "bg-dark" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Products Carousel */}
            <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 px-2 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-4xl font-light text-[#1B2A41] mb-2 sm:mb-4">Productos destacados</h2>
                        <p className="text-xs sm:text-base text-gray-600 mb-2 sm:mb-4">Los más populares cerca de ti</p>
                    </div>
                    <div className="flex items-center gap-2">

                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-[10px] bg-white"
                            onClick={() => window.location.href = '/map'}
                        >
                            Ver todos
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {mockProducts.slice(0, 4).map((product) => (
                        <div key={product.id} className="cursor-pointer" onClick={handleViewAllProducts}>
                            <Card className="overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-40 sm:h-48 object-cover rounded-t-2xl"
                                    />
                                    <Badge className="absolute top-3 left-3 bg-dark text-white text-xs">{product.category}</Badge>
                                </div>
                                <div className="p-3 sm:p-4">
                                    <h3 className="font-semibold text-base sm:text-lg mb-1 text-[#2D3844]">{product.name}</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mb-2">{product.seller}</p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs sm:text-sm font-medium">{product.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <MapPin className="w-3 h-3" />
                                            <span className="text-xs sm:text-sm">{product.distance}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-base sm:text-xl font-bold text-[#1B8FF]">${product.price}</span>
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-4 h-4 text-green-600" />
                                            <span className="text-xs text-green-600">Envío gratis</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl sm:text-4xl text-black font-light mb-2 sm:mb-4">¿Tienes productos para vender?</h2>
                    <p className="text-xs sm:text-gray-600 mb-4 sm:mb-6">Únete a nuestra plataforma y llega a miles de compradores locales</p>
                    <Button size="lg" className="bg-dark text-white hover:bg-dark font-semibold">
                        Comenzar a vender
                    </Button>
                </div>
            </div>
        </div>
    )
}