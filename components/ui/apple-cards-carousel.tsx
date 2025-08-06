import React, { useState, createContext, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CardProps = {
    src: string;
    title: string;
    category: string;
    content?: React.ReactNode;
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
    const swiperRef = useRef<any>(null);

    const handleCardClose = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.navigation) {
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    return (
        <CarouselContext.Provider
            value={{ onCardClose: handleCardClose, currentIndex }}
        >
            <div className="relative w-full max-w-full overflow-hidden pb-0 md:pb-0 md:px-0">

                {/* Contenedor flechas arriba, centrado horizontal */}
                <div className="flex justify-end items-center mb-6 space-x-4 md:flex">

                    <Button
                        variant="ghost"
                        size="icon"
                        className="custom-prev flex items-center justify-center border border-gray-300 bg-white/80 backdrop-blur-sm shadow-md hidden sm:flex"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="custom-next flex items-center justify-center border border-gray-300 bg-white/80 backdrop-blur-sm shadow-md hidden sm:flex"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>

                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView={1} // Cambiado a dinámico con breakpoints
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    modules={[Pagination, Navigation]}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 2, spaceBetween: 12 },
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                        1440: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    centeredSlides={false}
                    className="overflow-visible relative"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                    {cards.map((card, index) => (
                        <SwiperSlide
                            key={index}
                            className="flex h-auto"
                            style={{ width: "auto" }} // Ajuste dinámico
                        >
                            <Card card={card} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Paginación */}
                <div className="swiper-pagination mt-8 relative z-10"></div>

            </div>

            <style jsx global>{`
  .swiper-pagination {
    position: relative !important;
    margin-top: 2rem; /* mt-8 */
  }
  .swiper-pagination-bullet {
    background: #d1d5db !important; /* Gris claro */
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #1b2a41 !important; /* bg-dark */
  }
`}</style>
        </CarouselContext.Provider>
    );
}

function Card({ card }: { card: CardProps }) {
    return (
        <div
            className="relative flex flex-col h-[420px] md:h-[500px] overflow-hidden rounded-3xl cursor-default"
            style={{ width: "100%" }}
        >
            <Image
                src={card.src}
                alt={card.title}
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0 -z-10 rounded-3xl"
                priority={false}
                loading="lazy"
                placeholder={undefined}
                blurDataURL={undefined}
            />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <div className="relative z-20 p-6">
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
