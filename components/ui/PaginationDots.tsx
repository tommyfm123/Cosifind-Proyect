import React from "react";

interface PaginationDotsProps {
    total: number;
    current: number;
    onChange: (index: number) => void;
    className?: string;
}

export default function PaginationDots({ total, current, onChange, className = "" }: PaginationDotsProps) {
    return (
        <div className={`flex justify-center mt-4 gap-2 ${className}`}>
            {Array.from({ length: total }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onChange(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === current ? "bg-blue-500" : "bg-gray-300"}`}
                    aria-label={`Ir a página ${index + 1}`}
                />
            ))}
        </div>
    );
}