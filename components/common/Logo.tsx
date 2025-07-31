"use client"

import { MapPin } from "lucide-react"

interface LogoProps {
    size?: "sm" | "md" | "lg"
    variant?: "light" | "dark"
}

export default function Logo({ size = "sm", variant = "dark" }: LogoProps) {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-lg",
        lg: "text-xl",
    }

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    }

    const containerSizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
    }

    return (
        <div className="flex items-center gap-2">
            <div className={`${containerSizes[size]} bg-blue-500 rounded-lg flex items-center justify-center`}>
                <MapPin className={`${iconSizes[size]} text-white`} />
            </div>
            <span className={`${sizeClasses[size]} font-bold ${variant === "light" ? "text-white" : "text-gray-800"}`}>
                Cosifind
            </span>
        </div>
    )
}
