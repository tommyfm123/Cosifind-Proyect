"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/common/Logo"

interface LoginScreenProps {
    onLoginSuccess: () => void
    onNavigateHome: () => void
}

export default function LoginScreen({ onLoginSuccess, onNavigateHome }: LoginScreenProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Simulate API call
        if (email === "test@example.com" && password === "password123") {
            onLoginSuccess()
        } else {
            setError("Credenciales incorrectas. Intenta con test@example.com / password123")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
            <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-gray-100">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        <Logo size="md" variant="dark" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-[#2D3844]">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-gray-600">
                        Accede a tu cuenta para disfrutar de todas las funciones.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#2D3844] mb-2">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-[#F8FAFC] border-gray-200 focus:border-[#1B8FF] focus:ring-[#1B8FF]"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#2D3844] mb-2">
                                Contraseña
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-[#F8FAFC] border-gray-200 focus:border-[#1B8FF] focus:ring-[#1B8FF]"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <Button type="submit" className="w-full bg-[#1B8FF] hover:bg-[#1B8FF]/90">
                            Entrar
                        </Button>
                        <Button variant="link" className="w-full text-[#1B8FF]" onClick={onNavigateHome}>
                            Volver al Inicio
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
