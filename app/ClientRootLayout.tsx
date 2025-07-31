"use client"

import { useState } from "react"
import BottomNavigationBar from "@/components/navigation/BottomNavigationBar"
import ClientHeaderWrapper from "@/app/ClientHeaderWrapper"

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    const [activeScreen, setActiveScreen] = useState("home")

    return (
        <>
            <ClientHeaderWrapper />
            {children}
            <BottomNavigationBar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
        </>
    )
}
