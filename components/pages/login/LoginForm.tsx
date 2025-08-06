"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserByEmail } from "@/data/Mock";
import bcrypt from "bcryptjs";
import { useAuth } from "@/context/AuthContext";

interface LoginFormProps {
    onLoginSuccess: () => void;
    onNavigateHome: () => void;
}

export default function LoginForm({ onLoginSuccess, onNavigateHome }: LoginFormProps) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const user = getUserByEmail(email);
        if (user && bcrypt.compareSync(password, user.passwordHash)) {
            login({ id: user.id, name: user.name, email: user.email });
            onNavigateHome(); // Redirige al inicio después del login exitoso
        } else {
            setError("Credenciales incorrectas. Intenta nuevamente.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4">
            <div className="w-full max-w-md space-y-8">

                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Iniciar Sesion</h2>
                    <p className="text-sm text-gray-400 md:mt-2">Accede a tu cuenta</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email
                        </Label>
                        <div className="group">
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Contraseña
                        </Label>
                        <div className="group">
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 focus:bg-gradient-to-r focus:from-blue-500/20 focus:to-purple-600/20"
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Entrar"}
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-400">
                    No tenes una cuenta?{" "}
                    <a href="/signup" className="text-blue-400 hover:underline">
                        Registrate
                    </a>
                </p>
                <p className="mt-2 text-sm text-center text-gray-400">Credenciales de prueba:
                    <br />demo@usuario.com
                    <br />12345678910
                </p>
            </div>

        </div>
    );
}
