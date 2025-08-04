"use client"

import { Card, CardContent } from "@/components/ui/card"
import LoginForm from "@/components/pages/login/LoginForm"
import { useRouter } from "next/navigation"

export default function LoginScreen() {
    const router = useRouter()

    const handleLoginSuccess = () => {
        router.push("/") // Redirige al inicio después del login exitoso
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full  mx-auto bg-white shadow-lg ">
                <CardContent>
                    <LoginForm
                        onLoginSuccess={handleLoginSuccess}
                        onNavigateHome={() => router.push("/")}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
