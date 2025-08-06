"use client"

import React from "react"
import ProductSearchBar from "@/components/common/product-search-bar"

interface HeroSectionProps {
    searchQuery: string
    onSearchChange: (value: string) => void
}

export default function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
    return (
        <div
            className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 py-10 text-white text-center overflow-hidden sm:px-6 sm:py-20 md:px-12"
            style={{
                backgroundImage: "url(/images/banner.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay azul oscuro con opacidad */}
            <div className="absolute inset-0 bg-[#0a0f2c]/90 z-0" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <h1 className="text-4xl font-semibold tracking-tight leading-tight mb-6 sm:text-5xl md:text-6xl">
                    Buscá productos cerca tuyo.
                </h1>
                <p className="text-base font-light text-white/90 mb-10 max-w-3xl mx-auto sm:text-lg md:text-2xl">
                    Compará precios, encontrá ofertas únicas y andá a comprarlo en persona.
                </p>
                <ProductSearchBar
                    className="mt-4 max-w-full mx-auto sm:max-w-2xl"
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                />
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <a
                        href="https://play.google.com/store/games?hl=en&pli=1"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0f172a] bg-white rounded-[10px] shadow sm:text-base"
                    >
                        <img src="/images/icons/android.png" alt="Android" className="w-5 h-5" />
                        Android
                    </a>
                    <a
                        href="https://www.apple.com/la/app-store/"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0f172a] bg-white rounded-[10px] shadow sm:text-base"
                    >
                        <img src="/images/icons/apple-logo.png" alt="Apple" className="w-5 h-5" />
                        iOS
                    </a>
                </div>
            </div>
        </div>

    )
}
