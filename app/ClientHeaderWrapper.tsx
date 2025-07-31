"use client"

import Header from "@/components/common/Header"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function ClientHeaderWrapper() {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState("")
    const [activeScreen, setActiveScreen] = useState("home")
    const showSearch = pathname === "/" || pathname === "/map"

    return (
        <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            variant={showSearch ? "search" : "logo-only"}
            activeScreen={activeScreen}
            onScreenChange={setActiveScreen}
        />
    )
}