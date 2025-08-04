"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignUpForm() {
    const [accountType, setAccountType] = useState("buyer"); // buyer o seller
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [subscribe, setSubscribe] = useState(false);

    // Corrigiendo el tipo de formData para incluir propiedades opcionales
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData: {
            name: string;
            email: string;
            password: string;
            accountType: string;
            company?: string;
            category?: string;
        } = { name, email, password, accountType };

        if (accountType === "seller") {
            formData.company = company;
            formData.category = category;
        }

        console.log("Form submitted:", formData);
    };

    // Ajustando el diseño del formulario para ser responsive first
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Crear una cuenta</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="accountType" className="text-sm font-medium">
                            Tipo de Cuenta
                        </Label>
                        <Select onValueChange={(value) => setAccountType(value)}>
                            <SelectTrigger
                                id="accountType"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 sm:text-sm lg:text-base"
                            >
                                <SelectValue placeholder="Selecciona un tipo de cuenta" />
                            </SelectTrigger>
                            <SelectContent
                                className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg sm:text-sm lg:text-base"
                            >
                                <SelectItem value="buyer">Comprador</SelectItem>
                                <SelectItem value="seller">Vendedor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Nombre Completo
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Ingresa tu nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                            required
                        />
                    </div>
                    {accountType === "seller" && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-medium">
                                    Nombre de la Empresa
                                </Label>
                                <Input
                                    id="company"
                                    type="text"
                                    placeholder="Acme Inc."
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-medium">
                                    Categoría de Productos
                                </Label>
                                <Input
                                    id="category"
                                    type="text"
                                    placeholder="Electrónica, Ropa, etc."
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                                />
                            </div>
                        </>
                    )}
                    <Button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                    >
                        Crear Cuenta
                    </Button>
                </form>
                <p className="text-center text-sm sm:text-base text-gray-400">
                    Ya tenes una cuenta? {" "}
                    <a href="/login" className="text-blue-400 hover:underline">
                        Inicia Sesion
                    </a>
                </p>
            </div>
        </div>
    );
}
