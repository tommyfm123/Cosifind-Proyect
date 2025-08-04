import Logo from "@/components/common/Logo"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginHeader() {
    return (
        <CardHeader className="text-center">
            <div className="mx-auto mb-4">
                <Logo size="md" variant="dark" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#2D3844]">Iniciar Sesión</CardTitle>
            <CardDescription className="text-gray-600">
                Accede a tu cuenta para disfrutar de todas las funciones.
            </CardDescription>
        </CardHeader>
    )
}
