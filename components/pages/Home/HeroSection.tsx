"use client"

import React from "react"
import ProductSearchBar from "@/components/common/product-search-bar"

interface HeroSectionProps {
    searchQuery: string
    onSearchChange: (value: string) => void
}

export default function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
    return (
        <div className="relative bg-gradient-to-br from-[#0f172a] via-[#4f46e5] to-[#1e293b] min-h-[92vh] flex items-center justify-center px-4 sm:px-6 md:px-12 py-10 sm:py-20 text-white text-center overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-0" />
            <div className="relative z-10 max-w-5xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6">
                    Buscá productos cerca tuyo.
                </h1>
                <p className="text-base sm:text-lg md:text-2xl font-light text-white/90 mb-10 max-w-3xl mx-auto">
                    Compará precios, encontrá ofertas únicas y andá a comprarlo en persona.
                </p>
                <ProductSearchBar
                    className="mt-4 max-w-full sm:max-w-2xl mx-auto"
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                />
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
    )
}
