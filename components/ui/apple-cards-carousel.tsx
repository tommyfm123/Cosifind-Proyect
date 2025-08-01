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
            <div className="relative w-full max-w-full overflow-hidden pb-8 px-0">

                {/* Contenedor flechas arriba, centrado horizontal */}
                <div className="flex justify-end items-center mb-6 space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="custom-prev border border-gray-300 bg-white/80 backdrop-blur-sm shadow-md"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="custom-next border border-gray-300 bg-white/80 backdrop-blur-sm shadow-md"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>

                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    slidesPerView="auto"
                    spaceBetween={20}
                    pagination={{ clickable: true, el: ".custom-pagination" }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    modules={[Pagination, Navigation]}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 12 },
                        1024: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                    centeredSlides={false}
                    className="overflow-visible"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                    {cards.map((card, index) => (
                        <SwiperSlide
                            key={index}
                            className="flex h-auto"
                            style={{ width: "400px" }}
                        >
                            <Card card={card} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Paginación */}
                <div className="custom-pagination mt-8 flex justify-center space-x-2"></div>

            </div>

            <style jsx global>{`
        .swiper-wrapper {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  .swiper-wrapper::-webkit-scrollbar {
    display: none !important;
  }
  .swiper {
    overflow: visible !important;
  }
  .custom-pagination .swiper-pagination-bullet {
    width: 0.5rem; /* w-2 */
    height: 0.5rem; /* h-2 */
    border-radius: 9999px; /* rounded-full */
    transition: background-color 0.3s, opacity 0.3s; /* transition-colors duration-300 */
    background: #d1d5db; /* bg-gray-300 */
    opacity: 1;
    margin: 0 0.25rem;
  }
  .custom-pagination .swiper-pagination-bullet-active {
    background: #3b82f6; /* bg-blue-500 */
    opacity: 1;
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
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
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
