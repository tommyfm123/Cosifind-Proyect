"use client"

import { useState } from "react"
import FloatingNavigation from "@/components/navigation/FloatingNavigation"

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    const [activeScreen, setActiveScreen] = useState("home")

    return (
        <>
            {children}
            <FloatingNavigation activeScreen={activeScreen} onScreenChange={setActiveScreen} />
        </>
    )
}
