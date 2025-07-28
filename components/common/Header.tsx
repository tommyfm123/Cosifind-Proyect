"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import FilterButton from "@/components/ui/filter-button";

interface HeaderProps {
  activeScreen: string;
}

export default function Header({ activeScreen }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const showSearch = activeScreen === "home" || activeScreen === "map";
  const showFilter = activeScreen === "map";

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
          } catch (err) {
            console.error("Error obteniendo ubicación:", err);
          }
        },
        (error) => {
          console.error("Permiso de ubicación denegado o fallido", error);
        }
      );
    }
  }, []);

  return (
    <header className="bg-[#0E1534] text-white sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 shadow-sm py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 px-6 py-3">
        {/* Logo + texto */}
        <div className="flex items-center gap-4 shrink-0">
          <div dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          <h2 className="text-xl font-semibold">Cosifind</h2>
        </div>

        {showSearch && (
          <div className="flex flex-1 max-w-3xl w-full">
            <div className="flex items-center gap-2 bg-white text-black rounded-full px-0 py-0 w-full shadow-sm border border-gray-300">
              {/* Input principal */}
              <div className="flex-1">
                <PlaceholdersAndVanishInput
                  placeholders={[
                    "Iphone 16 Pro Max...",
                    "Auriculares...",
                    "Zapatillas",
                    "Remeras Nike...",
                  ]}
                  onChange={(e) => setQuery(e.target.value)}
                  onSubmit={() => { }} />
              </div>

              {/* Separador */}
              <div className="w-px h-6 bg-gray-300" />

              {/* Input ubicación */}
              <div className="flex items-center relative w-48">
                <MapPin className="absolute left-3 text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Tu ubicación"
                  className="bg-transparent text-black placeholder-gray-500 pl-10 pr-4 py-2 w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}


        {/* Botón de filtros */}
        {showFilter && (
          <div className="shrink-0 z-10">
            <FilterButton minimal />
          </div>
        )}
      </div>
    </header>
  );
}

const LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
  <path fill="#fff" d="M20 40c11.046 0 20-8.954 20-20V6a6 6 0 0 0-6-6H21v8.774c0 2.002.122 4.076 1.172 5.78a9.999 9.999 0 0 0 6.904 4.627l.383.062a.8.8 0 0 1 0 1.514l-.383.062a10 10 0 0 0-8.257 8.257l-.062.383a.8.8 0 0 1-1.514 0l-.062-.383a10 10 0 0 0-4.627-6.904C12.85 21.122 10.776 21 8.774 21H.024C.547 31.581 9.29 40 20 40Z"/>
  <path fill="#fff" d="M0 19h8.774c2.002 0 4.076-.122 5.78-1.172a10.018 10.018 0 0 0 3.274-3.274C18.878 12.85 19 10.776 19 8.774V0H6a6 6 0 0 0-6 6v13Z"/>
</svg>
`;
