// Archivo principal: HomeScreen.tsx

"use client"

import React from "react"
import CategoriesSection from "@/components/pages/home/CategoriesSection"
import ProductsSection from "@/components/pages/home/ProductsSection"
import HeroSection from "@/components/pages/home/HeroSection"
import PromotionsSection from "@/components/pages/home/PromotionsSection"
import CallToActionSection from "@/components/pages/home/CallToActionSection"
import { mockCategories, mockProducts } from "@/data/mockData"

interface HomeScreenProps {
    onNavigateToMap?: (category?: string) => void
    onShowAllProducts?: () => void
    searchQuery: string
    onSearchChange: (value: string) => void
    isLoggedIn: boolean
}

export default function HomeScreen(props: HomeScreenProps) {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <HeroSection searchQuery={props.searchQuery} onSearchChange={props.onSearchChange} />
            <PromotionsSection />
            <CategoriesSection categories={mockCategories} onNavigateToMap={props.onNavigateToMap} />
            <ProductsSection products={mockProducts} onShowAllProducts={props.onShowAllProducts} />
            <CallToActionSection />
        </div>
    )
}
