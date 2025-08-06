"use client"

import { Card, CardContent } from "@/components/ui/card"
import LoginForm from "@/components/pages/login/LoginForm"
import { useRouter } from "next/navigation"

interface LoginScreenProps {
    onLoginSuccess: () => void;
    onNavigateHome: () => void;
}

export default function LoginScreen({ onLoginSuccess, onNavigateHome }: LoginScreenProps) {
    const router = useRouter()

    const handleLoginSuccess = () => {
        router.push("/") // Redirige al inicio después del login exitoso
    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <Card className="w-full  mx-auto bg-white shadow-lg  ">
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
