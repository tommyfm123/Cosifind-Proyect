import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginFormProps {
    onLoginSuccess: () => void
    onNavigateHome: () => void
}

export default function LoginForm({ onLoginSuccess, onNavigateHome }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (email === "test@example.com" && password === "password123") {
            onLoginSuccess()
        } else {
            setError("Credenciales incorrectas. Intenta con test@example.com / password123")
        }
    }

    return (
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
    )
}
