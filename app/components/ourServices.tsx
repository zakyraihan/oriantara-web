"use client"
import { useHorizontalScroll } from '@/hook/useHorizontalScroll';
import React from 'react';

interface Service {
    title: string;
    desc: string;
    img: string;
}

const OurServices: React.FC = () => {
    const services: Service[] = [
        {
            title: "Product Sourcing & Quality Control",
            desc: "We help international buyers source high-quality Indonesian raw materials — from spices to charcoal — while ensuring every batch meets export-grade quality standards.",
            img: "/assets/IMAGE REMPAH2.png",
        },
        {
            title: "Export Management & Documentation",
            desc: "From handling permits to ensuring smooth customs clearance, we manage the entire export process — so you can focus on your business, not the paperwork.",
            img: "/assets/IMAGE CARGO.png",
        },
        {
            title: "Global Logistics Coordination",
            desc: "We collaborate with trusted freight forwarders to ship your goods efficiently, securely, and on time — whether by sea, air, or land.",
            img: "/assets/IMAGE SHIP CG.png",
        },
    ];

    const { scrollRef, canScrollLeft, canScrollRight, checkScroll, scroll } = useHorizontalScroll();

    return (
        <section className="w-full bg-black py-20 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
                        OUR SERVICES
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        We help buyers connect with high–quality products and provide logistics assistance worldwide.
                    </p>
                </div>

                <div className="relative">
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition flex items-center justify-center"
                            aria-label="Scroll left"
                        >
                            <span className="text-2xl text-white">‹</span>
                        </button>
                    )}

                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-6 px-4 md:px-2 -mx-4 md:mx-0"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {services.map((item: Service, i: number) => (
                            <div
                                key={i}
                                className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[400px] flex-shrink-0 relative rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                {/* Image Container - Responsive Height */}
                                <div className="relative h-[350px] sm:h-[380px] md:h-[400px] w-full">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
                                </div>

                                {/* Text Content - Responsive Padding */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
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

                <div className="text-center mt-16">
                    <button className="px-10 py-3 border-2 rounded-full border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-sm font-semibold tracking-wider">
                        LEARN MORE
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
};

export default OurServices;