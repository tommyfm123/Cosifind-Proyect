"use client"

import React, { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

interface ProductsSectionProps {
    products: Product[]
    onShowAllProducts?: () => void
}

export default function ProductsSection({ products, onShowAllProducts }: ProductsSectionProps) {
    const paginationRef = useRef<HTMLDivElement>(null)
    const swiperRef = useRef<any>(null)

    const goNext = () => {
        swiperRef.current?.swiper.slideNext()
    }

    const goPrev = () => {
        swiperRef.current?.swiper.slidePrev()
    }

    return (
        <div className="px-2 py-10 bg-white sm:px-4 sm:py-16 md:px-8 md:py-20 lg:px-16 lg:py-24 overflow-x-hidden">
            <div className="flex flex-col items-start justify-between gap-4 px-2 mb-6 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-xl font-medium text-[#1B2A41] mb-2 sm:text-2xl md:text-3xl">Productos más vistos</h2>
                    <p className="text-xs text-gray-600 sm:text-sm md:text-base">Descubrí los productos más buscados cerca tuyo!</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-[10px] bg-white"
                        onClick={onShowAllProducts}
                    >
                        Ver todos
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="border border-gray-300 bg-white/80 backdrop-blur-sm shadow-md hidden sm:flex"
                        aria-label="Previous slide"
                        onClick={goPrev}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="border border-gray-300 bg-white/80 backdrop-blur-sm shadow-md hidden sm:flex"
                        aria-label="Next slide"
                        onClick={goNext}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <Swiper
                ref={swiperRef}
                slidesPerView={1.2}
                spaceBetween={12}
                breakpoints={{
                    0: { slidesPerView: 1.2, spaceBetween: 12 },
                    480: { slidesPerView: 2, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                }}
                navigation={false} // Navegación deshabilitada para dispositivos móviles
                pagination={{
                    clickable: true,
                    el: paginationRef.current,
                }}
                modules={[Pagination, Navigation]}
                className="overflow-hidden" // Cambiado a overflow-hidden para evitar que salga del contenedor
                allowTouchMove={true} // Habilitar deslizamiento táctil
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="flex h-auto">
                        <div className="relative flex flex-col w-full min-h-[400px] h-full overflow-hidden mb-4 rounded-xl border border-gray-200 shadow-md">
                            <div className="relative h-60 sm:h-72 md:h-80 overflow-hidden rounded-t-xl">
                                <img
                                    className="object-cover w-full h-full"
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                />
                                <Badge className="absolute top-2 left-2 bg-dark text-white text-xs">
                                    {product.category}
                                </Badge>
                            </div>

                            <div className="flex flex-col grow px-5 py-4 justify-between">
                                <div>
                                    <h5 className="text-base font-semibold text-slate-900 line-clamp-2">
                                        {product.name}
                                    </h5>
                                    <p className="text-xs text-gray-600">{product.seller}</p>
                                </div>

                                <div>
                                    <div className="flex items-center mt-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                aria-hidden="true"
                                                className={`h-4 w-4 ${i < Math.round(product.rating) ? "text-yellow-300" : "text-gray-300"}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        ))}
                                        <span className="ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <span className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                                            ${product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Paginación visible abajo */}
            <div
                ref={paginationRef}
                className="custom-pagination mt-10 flex justify-center space-x-2"
            />
        </div>
    )
}
