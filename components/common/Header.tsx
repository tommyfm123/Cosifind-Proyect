"use client";

import Image from "next/image";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow">
      <div className="max-w-6xl mx-auto flex items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <Image src="/placeholder-logo.png" alt="Logo" width={40} height={40} />
          <span className="font-bold">Cosifind</span>
        </div>
        <div className="flex-1">
          <PlaceholdersAndVanishInput
            placeholders={["Buscar productos", "Buscar tiendas"]}
            onChange={(e) => setQuery(e.target.value)}
            onSubmit={() => {}}
          />
        </div>
      </div>
    </header>
  );
}
