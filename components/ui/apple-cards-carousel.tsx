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
            <div className="relative w-full max-w-7xl overflow-hidden py-8 px-0"> {/* overflow-hidden para eliminar scroll lateral */}
                <Swiper
                    slidesPerView={4}                // desktop fijo 3 cards
                    spaceBetween={20}
                    pagination={{ clickable: true, el: ".custom-pagination" }}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    modules={[Pagination, Navigation]}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 }, // mobile 1.5 cards
                        640: { slidesPerView: 2, spaceBetween: 12 },
                        1024: { slidesPerView: 3, spaceBetween: 20 }, // desktop 3 cards
                    }}
                    centeredSlides={false}           // desactivar centrado para evitar espacio vacío lateral
                    className="overflow-visible"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                    {cards.map((card, index) => (
                        <SwiperSlide
                            key={index}
                            className="flex h-auto"
                            style={{ width: "400px" }} // ancho fijo, igual que Card
                        >
                            <Card card={card} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Botones fuera del carrusel y sin superposición */}
                <button
                    className="custom-prev absolute top-1/2 left-[-80px] z-30 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black hidden md:flex items-center justify-center"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    className="custom-next absolute top-1/2 right-[-80px] z-30 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black hidden md:flex items-center justify-center"
                    aria-label="Next slide"
                >
                    <ChevronRight size={28} />
                </button>

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
            className="relative flex flex-col h-[420px] md:h-[500px] overflow-hidden rounded-3xl cursor-default"
            style={{ width: "100%" }}  // que ocupe todo el ancho del slide
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
                <p className="text-left font-sans text-sm font-medium text-white md:text-base">{card.category}</p>
                <p className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl">
                    {card.title}
                </p>
            </div>
        </div>
    );
}
