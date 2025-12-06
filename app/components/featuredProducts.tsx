"use client"
import { useHorizontalScroll } from "@/hook/useHorizontalScroll";

export default function FeaturedProduct() {
    const products = [
        {
            name: "Vanilla",
            desc: "Premium-Grade Indonesian Vanilla Beans With Rich Aroma And High Vanillin Content.",
            img: "/assets/VANILI 2.png",
            active: false,
        },
        {
            name: "Cloves",
            desc: "Strong-Aroma Cloves From Indonesia, High Oil Content And Sun-Dried Naturally.",
            img: "/assets/CENGKEH 1.png",
            active: true, // Card yang disorot
        },
        {
            name: "Black Papper",
            desc: "Bold And Aromatic Whole Black Peppercorns Sourced From Indonesia’s Finest Farms.",
            img: "/assets/LADA HITAM 1.png",
            active: false,
        },
    ];

    const { scrollRef, canScrollLeft, canScrollRight, checkScroll, scroll } = useHorizontalScroll()


    return (
        <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto text-center">

                {/* Title */}
                <div className="text-center mb-16">
                    <div className="inline-block">
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            FEATURED PRODUCT
                        </h2>
                        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#1F1F1F] via-[#454545] to-[#3999999] rounded-full"></div>
                    </div>
                    <p className="text-gray-400 mt-6 text-lg">
                        Discover our premium selection of Indonesian spices
                    </p>
                </div>

                {/* Cards */}
                <div className="relative">
                    {
                        canScrollLeft && (
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition flex items-center justify-center"
                                aria-label="Scroll left"
                            >
                                <span className="text-2xl text-white">‹</span>
                            </button>
                        )
                    }

                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-6 px-4 md:px-2 -mx-4 md:mx-0"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                        }}>

                        {products.map((item: any, i: number) => (
                            <div
                                key={i}
                                className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[400px] flex-shrink-0 relative rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <div className="relative h-[350px] sm:h-[380px] md:h-[400px] w-full">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 ">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight text-left">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 md:line-clamp-none text-left">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition flex items-center justify-center"
                            aria-label="Scroll right"
                        >
                            <span className="text-2xl text-white">›</span>
                        </button>
                    )}


                </div>

                {/* See All */}
                <div className="mt-10">
                    <button className="text-gray-300 hover:text-white underline text-sm">
                        See All Product
                    </button>
                </div>
            </div>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
