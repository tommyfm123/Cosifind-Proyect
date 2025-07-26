"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FilterButton() {
    return (
        <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-[#0E1534]"
            onClick={() => {
                // lógica de abrir modal o sidebar de filtros
                console.log("Abrir filtros");
            }}
        >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
        </Button>
    );
}