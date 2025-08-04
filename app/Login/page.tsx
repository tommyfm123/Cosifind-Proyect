"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import LoginHeader from "@/components/pages/login/LoginHeader"
import LoginForm from "@/components/pages/login/LoginForm"

interface LoginScreenProps {
    onLoginSuccess: () => void
    onNavigateHome: () => void
}

export default function LoginScreen({ onLoginSuccess, onNavigateHome }: LoginScreenProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-gray-100">
                <LoginHeader />
                <CardContent>
                    <LoginForm onLoginSuccess={onLoginSuccess} onNavigateHome={onNavigateHome} />
                </CardContent>
            </Card>
        </div>
    )
}
