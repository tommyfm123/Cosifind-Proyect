"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, MapPin, Settings, Lock, Bell, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileScreenProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState("personal")

  const tabs = [
    { id: "personal", label: "Datos Personales", icon: User },
    { id: "location", label: "Ubicación", icon: MapPin },
    { id: "preferences", label: "Preferencias", icon: Settings },
    { id: "security", label: "Seguridad", icon: Lock },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "payment", label: "Pagos", icon: CreditCard },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre completo</label>
              <Input defaultValue="Juan Pérez" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input defaultValue="juan@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Teléfono</label>
              <Input defaultValue="+54 381 123-4567" />
            </div>
            <Button className="w-full">Guardar cambios</Button>
          </div>
        )
      case "location":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Dirección</label>
              <Input defaultValue="Av. Aconquija 1234, Tucumán" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ciudad</label>
              <Input defaultValue="San Miguel de Tucumán" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Código Postal</label>
              <Input defaultValue="4000" />
            </div>
            <Button className="w-full">Actualizar ubicación</Button>
          </div>
        )
      case "preferences":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notificaciones push</span>
              <Button variant="outline" size="sm">
                Activado
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Modo oscuro</span>
              <Button variant="outline" size="sm">
                Desactivado
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Ubicación automática</span>
              <Button variant="outline" size="sm">
                Activado
              </Button>
            </div>
          </div>
        )
      case "security":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña actual</label>
              <Input type="password" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nueva contraseña</label>
              <Input type="password" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
              <Input type="password" />
            </div>
            <Button className="w-full">Cambiar contraseña</Button>
          </div>
        )
      default:
        return <div>Contenido de {activeTab}</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 py-6 pb-32">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Juan Pérez</h1>
          <p className="text-gray-600">Miembro desde 2024</p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Tab Content */}
        <Card>
          <CardHeader>
            <CardTitle>{tabs.find((tab) => tab.id === activeTab)?.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
