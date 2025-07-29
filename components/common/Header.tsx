"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MapPin, Home, Heart, MapPin as MapPinIcon, MessageCircle, User } from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface HeaderProps {
  activeScreen: string;
  onScreenChange?: (screen: string) => void;
}

export default function Header({ onScreenChange }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Definir pantallas según ruta (ajustar si rutas son diferentes)
  const routeToScreen: { [key: string]: string } = {
    "/": "home",
    "/favorites": "favorites",
    "/map": "map",
    "/messages": "messages",
    "/profile": "profile",
  };

  const activeScreen = routeToScreen[pathname] || "home";

  const showSearch = activeScreen === "home" || activeScreen === "map";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            setLocation(
              data.address.city || data.address.town || data.address.state || data.display_name
            );
          } catch { }
        },
        () => { }
      );
    }
  }, []);

  const navItems = [
    { id: "home", icon: Home, label: "Inicio", href: "/" },
    { id: "favorites", icon: Heart, label: "Favoritos", href: "/favorites" },
    { id: "map", icon: MapPinIcon, label: "Mapa", href: "/map" },
    { id: "messages", icon: MessageCircle, label: "Mensajes", href: "/messages" },
    { id: "profile", icon: User, label: "Perfil", href: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0E1534] bg-opacity-90 backdrop-blur-md border-b border-gray-200 shadow-sm px-6 py-3 sm:px-8 sm:py-4 md:h-20">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 h-full">

        {/* Logo */}
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          <h1 className="text-lg font-semibold text-white select-none">Cosifind</h1>
        </div>

        {/* Search bar */}
        {showSearch && (
          <div className="w-full md:flex-1 max-w-3xl mt-3 md:mt-0">
            <div className="flex bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden max-w-full items-center px-2">
              {/* Search input - 60% */}
              <div className="flex-[3] min-w-0">
                <PlaceholdersAndVanishInput
                  placeholders={[
                    "Telefonos...",
                    "Auriculares...",
                    "Zapatillas...",
                    "Remeras...",
                  ]}
                  onChange={(e) => setQuery(e.target.value)}
                  onSubmit={() => { }}
                />
              </div>

              {/* Divider */}
              <div className="border-l border-gray-300 h-6 mx-2" />

              {/* Location input - 40% */}
              <div className="flex-[2] relative min-w-0">
                <MapPin className="absolute top-1/2 left-1 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tu ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-7 text-sm py-2 text-gray-800 placeholder-gray-400 focus:outline-none"
                  spellCheck={false}
                  style={{ height: "38px" }}
                />
              </div>
            </div>
          </div>
        )}




        {/* Navigation (desktop only) */}
        <nav className="hidden md:flex items-center gap-6 flex-shrink-0">
          {navItems.map(({ id, icon: Icon, href }) => {
            const isActive = activeScreen === id;
            return (
              <button
                key={id}
                onClick={() => router.push(href)}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors
                  ${isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-blue-300 hover:text-white"
                  }
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-current={isActive ? "page" : undefined}
                type="button"
                title={id.charAt(0).toUpperCase() + id.slice(1)}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </nav>
      </div>
    </header>

  );
}

const LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40">
  <path fill="#2563EB" d="M20 40c11.046 0 20-8.954 20-20V6a6 6 0 0 0-6-6H21v8.774c0 2.002.122 4.076 1.172 5.78a9.999 9.999 0 0 0 6.904 4.627l.383.062a.8.8 0 0 1 0 1.514l-.383.062a10 10 0 0 0-8.257 8.257l-.062.383a.8.8 0 0 1-1.514 0l-.062-.383a10 10 0 0 0-4.627-6.904C12.85 21.122 10.776 21 8.774 21H.024C.547 31.581 9.29 40 20 40Z"/>
  <path fill="#2563EB" d="M0 19h8.774c2.002 0 4.076-.122 5.78-1.172a10.018 10.018 0 0 0 3.274-3.274C18.878 12.85 19 10.776 19 8.774V0H6a6 6 0 0 0-6 6v13Z"/>
</svg>
`;
