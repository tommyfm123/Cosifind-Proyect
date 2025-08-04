"use client"

import React from "react"
import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel"
import { applePromotions } from "@/data/mockData"


export default function PromotionsSection() {
    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1B2A41]">Promociones de la semana</h2>
            <div className="relative overflow-x-auto scroll-smooth px-0">
                <AppleCardsCarousel cards={applePromotions} />
            </div>
        </div>
    )
}
