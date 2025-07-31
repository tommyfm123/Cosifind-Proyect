"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LocationSuggestion {
    id: string
    name: string
    fullName: string
}

interface ProductSearchBarProps {
    className?: string
}

// Mock location data - en una aplicación real, esto vendría de una API de geocodificación
const mockLocations: LocationSuggestion[] = [
    { id: "1", name: "New York", fullName: "New York, NY, USA" },
    { id: "2", name: "Los Angeles", fullName: "Los Angeles, CA, USA" },
    { id: "3", name: "Chicago", fullName: "Chicago, IL, USA" },
    { id: "4", name: "Miami", fullName: "Miami, FL, USA" },
    { id: "5", name: "San Francisco", fullName: "San Francisco, CA, USA" },
    { id: "6", name: "Seattle", fullName: "Seattle, WA, USA" },
    { id: "7", name: "Boston", fullName: "Boston, MA, USA" },
    { id: "8", name: "Austin", fullName: "Austin, TX, USA" },
]

export default function ProductSearchBar({ className = "" }: ProductSearchBarProps) {
    const [product, setProduct] = useState("")
    const [location, setLocation] = useState("")
    const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([])
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
    const [isGettingLocation, setIsGettingLocation] = useState(false)
    const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null)

    const locationInputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    // Comprobar el permiso de geolocalización al montar el componente
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                setHasLocationPermission(result.state === "granted")
            })
        }
    }, [])

    // Manejar cambios en la entrada de ubicación y mostrar sugerencias
    const handleLocationChange = (value: string) => {
        setLocation(value)
        if (value.length > 0) {
            const filtered = mockLocations.filter(
                (loc) =>
                    loc.name.toLowerCase().includes(value.toLowerCase()) ||
                    loc.fullName.toLowerCase().includes(value.toLowerCase()),
            )
            setLocationSuggestions(filtered)
            setShowLocationSuggestions(true)
        } else {
            setShowLocationSuggestions(false)
        }
    }

    // Obtener la ubicación actual del usuario
    const getCurrentLocation = () => {
        if (!("geolocation" in navigator)) {
            alert("La geolocalización no es compatible con este navegador.")
            return
        }
        setIsGettingLocation(true)
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    // Simular un retraso de API
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    // Respuesta simulada - en realidad, llamarías a una API de geocodificación inversa
                    const mockCurrentLocation = `Ubicación Actual (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`
                    setLocation(mockCurrentLocation)
                    setShowLocationSuggestions(false)
                    setHasLocationPermission(true)
                } catch (error) {
                    console.error("Error al obtener el nombre de la ubicación:", error)
                    setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
                } finally {
                    setIsGettingLocation(false)
                }
            },
            (error) => {
                setIsGettingLocation(false)
                setHasLocationPermission(false)
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Acceso a la ubicación denegado. Por favor, introduce tu ubicación manualmente.")
                        break
                    case error.POSITION_UNAVAILABLE:
                        alert("Información de ubicación no disponible.")
                        break
                    case error.TIMEOUT:
                        alert("La solicitud de ubicación ha excedido el tiempo límite.")
                        break
                    default:
                        alert("Ocurrió un error desconocido al obtener la ubicación.")
                        break
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutos
            },
        )
    }

    // Manejar la selección de una sugerencia
    const handleSuggestionClick = (suggestion: LocationSuggestion) => {
        setLocation(suggestion.fullName)
        setShowLocationSuggestions(false)
        locationInputRef.current?.blur()
    }

    // Manejar la búsqueda
    const handleSearch = () => {
        if (!product.trim()) {
            alert("Por favor, introduce un producto para buscar.")
            return
        }
        if (!location.trim()) {
            alert("Por favor, selecciona o introduce una ubicación.")
            return
        }
        console.log("Buscando:", { product, location })
        alert(`Buscando "${product}" en "${location}"`)
    }

    // Cerrar sugerencias al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !locationInputRef.current?.contains(event.target as Node)
            ) {
                setShowLocationSuggestions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className={`w-full max-w-3xl mx-auto px-4 py-2 ${className}`}>
            <div className="bg-white rounded-[30px] border border-gray-200 h-[56px] flex items-center shadow-md w-full">
                {/* Campo de Producto */}
                <div className="flex-1 h-full flex flex-col justify-center px-6 cursor-pointer  rounded-[30px]">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Producto</span>
                    <Input
                        type="text"
                        placeholder="Buscar productos..."
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className="border-0 p-0 text-sm bg-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>

                {/* Campo de Ubicación */}
                <div className="flex-1 h-full flex flex-col justify-center px-6 relative border-l border-gray-200 cursor-pointers">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Ubicación</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={getCurrentLocation}
                            disabled={isGettingLocation}
                            className="h-5 px-1 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-full"
                        >
                            {isGettingLocation ? <Loader2 className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                            <span className="ml-1 text-[10px] font-semibold whitespace-nowrap">Obtener ubicación</span>
                        </Button>
                    </div>
                    <Input
                        ref={locationInputRef}
                        type="text"
                        placeholder="Introduce tu ubicación"
                        value={location}
                        onChange={(e) => handleLocationChange(e.target.value)}
                        onFocus={() => location.length > 0 && setShowLocationSuggestions(true)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="border-0 p-0 bg-white text-sm placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
                    />

                    {/* Sugerencias de Ubicación */}
                    {showLocationSuggestions && locationSuggestions.length > 0 && (
                        <div
                            ref={suggestionsRef}
                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                        >
                            {locationSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion.id}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full px-4 py-3 text-left  border-b border-gray-100 last:border-b-0 focus:outline-none"
                                >
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{suggestion.name}</div>
                                            <div className="text-xs text-gray-500">{suggestion.fullName}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Botón de Búsqueda */}
                <div className="h-full flex items-center px-2">
                    <Button
                        onClick={handleSearch}
                        className="rounded-[30px] h-10 w-10 bg-blue-900  flex-shrink-0"
                        size="icon"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
