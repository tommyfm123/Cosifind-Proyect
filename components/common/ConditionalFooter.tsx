"use client";

import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConditionalFooter() {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (pathname === "/map" && isMobile) {
        return null;
    }

    return <Footer />;
}
