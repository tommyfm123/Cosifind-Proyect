"use client";

import React, { useState, createContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CardProps = {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
};

export const CarouselContext = createContext<{
    onCardClose: (index: number) => void;
    currentIndex: number;
}>({
    onCardClose: () => { },
    currentIndex: 0,
});

export function AppleCardsCarousel({ cards }: { cards: CardProps[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleCardClose = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
            <div className="relative w-full max-w-7xl py-16 overflow-visible">
                <div className="relative">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={14}
                        pagination={{ clickable: true, el: ".custom-pagination" }}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        modules={[Pagination, Navigation]}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                        breakpoints={{
                            320: { slidesPerView: 1.5, spaceBetween: 0 },
                            640: { slidesPerView: 2, spaceBetween: 12 },
                            1024: { slidesPerView: 4, spaceBetween: 6 },
                        }}
                        className="overflow-visible"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {cards.map((card, index) => (
                            <SwiperSlide key={index} className="!h-auto !flex justify-center">
                                <Card card={card} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Botones de navegación (visible desde md en adelante) */}
                    <button
                        className="custom-prev absolute top-1/2 left-[-70px] z-30 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black hidden md:block"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="custom-next absolute top-1/2 right-[-70px] z-30 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black hidden md:block"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Paginación */}
                <div className="custom-pagination mt-8 flex justify-center space-x-2"></div>
            </div>

            <style jsx global>{`
        .swiper-wrapper::-webkit-scrollbar {
          display: none !important;
        }
        .swiper {
          overflow: visible !important;
        }
        .custom-pagination .swiper-pagination-bullet {
          background: #000;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          opacity: 1;
          background: #000;
        }
      `}</style>
        </CarouselContext.Provider>
    );
}

function Card({ card }: { card: CardProps }) {
    return (
        <div
            className="relative flex w-full max-w-[260px] h-[420px] md:max-w-[280px] md:h-[500px] flex-col overflow-hidden rounded-3xl cursor-default"
            style={{ minWidth: 0 }}
        >
            <Image
                src={card.src}
                alt={card.title}
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0 -z-10 rounded-3xl"
                priority={false}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
            />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="relative z-20 p-8">
                <p className="text-left font-sans text-sm font-medium text-white md:text-base">
                    {card.category}
                </p>
                <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
                    {card.title}
                </p>
            </div>
        </div>
    );
}
