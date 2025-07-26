"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import FilterButton from "@/components/ui/filter-button";

interface HeaderProps {
  activeScreen: string;
}

export default function Header({ activeScreen }: HeaderProps) {
  const [query, setQuery] = useState("");

  const showSearch = activeScreen === "home" || activeScreen === "map";
  const showFilter = activeScreen === "map";

  return (
    <header className="bg-[#0E1534] text-white sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 shadow-sm py-3">
      <div className="max-w-6xl mx-auto relative flex items-center px-5 py-3">
        {/* Logo a la izquierda */}
        <div className="shrink-0 z-10" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />

        {/* Search bar centrado absoluto */}
        {showSearch && (
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl z-0">
            <PlaceholdersAndVanishInput
              placeholders={["Iphone 16 Pro Max...", "Auriculares...", "Zapatillas", "Remeras Nike..."]}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={() => { }}
              className="bg-white bg-opacity-10 placeholder-white placeholder-opacity-70 text-white rounded-lg py-2 px-4 focus:outline-none focus:bg-opacity-20 transition w-full"
            />
          </div>
        )}

        {/* Filtro a la derecha (solo en map) */}
        {showFilter && (
          <div className="shrink-0 z-10 ml-auto">
            <FilterButton minimal />
          </div>
        )}
      </div>
    </header>
  );
}

const LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30" fill="none" viewBox="0 0 220 40">
  <path fill="#fff" d="M20 40c11.046 0 20-8.954 20-20V6a6 6 0 0 0-6-6H21v8.774c0 2.002.122 4.076 1.172 5.78a9.999 9.999 0 0 0 6.904 4.627l.383.062a.8.8 0 0 1 0 1.514l-.383.062a10 10 0 0 0-8.257 8.257l-.062.383a.8.8 0 0 1-1.514 0l-.062-.383a10 10 0 0 0-4.627-6.904C12.85 21.122 10.776 21 8.774 21H.024C.547 31.581 9.29 40 20 40Z"></path>
  <path fill="#fff" d="M0 19h8.774c2.002 0 4.076-.122 5.78-1.172a10.018 10.018 0 0 0 3.274-3.274C18.878 12.85 19 10.776 19 8.774V0H6a6 6 0 0 0-6 6v13Z"></path>
</svg>
`;