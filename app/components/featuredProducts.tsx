"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useHorizontalScroll } from "@/hook/useHorizontalScroll";

type Category = "Spices" | "Commodities";

interface Product {
    name: string;
    category: Category;
    desc: string;
    img: string;
    active: boolean;
}

const PRODUCTS: Product[] = [
    {
        name: "Vanilla",
        category: "Spices",
        desc: "Premium-grade Indonesian vanilla beans with rich aroma and high vanillin content.",
        img: "/assets/VANILI 2.png",
        active: false,
    },
    {
        name: "Cloves",
        category: "Spices",
        desc: "Strong-aroma cloves from Indonesia, high oil content and sun-dried naturally.",
        img: "/assets/CENGKEH 1.png",
        active: true, // kartu yang disorot
    },
    {
        name: "Black Pepper",
        category: "Spices",
        desc: "Bold and aromatic whole black peppercorns sourced from Indonesia's finest farms.",
        img: "/assets/LADA HITAM 1.png",
        active: false,
    },
    // ===== Komoditas (ganti path gambar sesuai file Anda di /public/assets) =====
    {
        name: "Coconut Charcoal",
        category: "Commodities",
        desc: "Charcoal made from Indonesian coconut shells, widely used for cooking and industrial needs.",
        img: "/assets/ARANG 1.png",
        active: false,
    },
    {
        name: "Charcoal Briquette",
        category: "Commodities",
        desc: "Coconut-based charcoal briquettes, uniform in shape and easy to pack and ship.",
        img: "/assets/BRIKET 1.png",
        active: false,
    },
    {
        name: "Coffee",
        category: "Commodities",
        desc: "Indonesian coffee beans sourced from local farmers and prepared for export.",
        img: "/assets/KOPI 1.png",
        active: false,
    },
    {
        name: "Cocoa",
        category: "Commodities",
        desc: "Indonesian cocoa beans sourced from local farmers and prepared for export.",
        img: "/assets/KAKAO 1.png",
        active: false,
    },
];

const FILTERS: ("All" | Category)[] = ["All", "Spices", "Commodities"];

const WA = "https://wa.me/6285780560420";
const quoteLink = (name: string) =>
    `${WA}?text=${encodeURIComponent(`Hello Oriantara, I would like to request a quote for ${name}.`)}`;

const EASE = "cubic-bezier(.22,.8,.2,1)";

export default function FeaturedProduct() {
    const { scrollRef, canScrollLeft, canScrollRight, checkScroll, scroll } = useHorizontalScroll();

    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const [reduced, setReduced] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filter, setFilter] = useState<"All" | Category>("All");
    const [failed, setFailed] = useState<Set<string>>(new Set());

    const list = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

    // Saat filter berubah: kembali ke awal & hitung ulang panah/progress
    useEffect(() => {
        const el = scrollRef.current as HTMLElement | null;
        if (!el) return;
        el.scrollTo({ left: 0 });
        const id = requestAnimationFrame(() => el.dispatchEvent(new Event("scroll")));
        return () => cancelAnimationFrame(id);
    }, [filter, scrollRef]);

    // Animasi masuk saat section terlihat
    useEffect(() => {
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setReduced(rm);
        const el = sectionRef.current;
        if (!el) return;
        if (rm) {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Progress bar posisi carousel
    useEffect(() => {
        const el = scrollRef.current as HTMLElement | null;
        if (!el) return;
        const update = () => {
            const max = el.scrollWidth - el.clientWidth;
            setProgress(max <= 0 ? 1 : (el.scrollLeft + el.clientWidth) / el.scrollWidth);
        };
        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [scrollRef]);

    const fx = (delay: number) => ({
        className: `transition-all ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-sm"
            }`,
        style: {
            transitionDuration: reduced ? "0ms" : "900ms",
            transitionDelay: reduced ? "0ms" : `${delay}ms`,
            transitionTimingFunction: EASE,
        } as React.CSSProperties,
    });

    const arrowCls =
        "flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur transition hover:border-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:bg-white/5";

    return (
        <section
            id="product"
            ref={sectionRef}
            className="font-body relative w-full overflow-hidden bg-[#0a0a0a] py-24 text-[#f5f5f5] lg:py-32"
        >
            {/* Tekstur grid halus */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2
                            className={`font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl ${fx(0).className}`}
                            style={fx(0).style}
                        >
                            Featured products
                        </h2>
                        <p
                            className={`mt-5 max-w-xl text-lg leading-relaxed text-gray-300 ${fx(150).className}`}
                            style={fx(150).style}
                        >
                            Premium Indonesian spices, selected for aroma, quality, and consistency in every shipment.
                        </p>
                    </div>

                    <div
                        className={`hidden items-center gap-3 md:flex ${fx(250).className}`}
                        style={fx(250).style}
                    >
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={arrowCls}
                            aria-label="Scroll left"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 6l-6 6 6 6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={arrowCls}
                            aria-label="Scroll right"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Filter kategori */}
                <div
                    className={`mb-8 flex flex-wrap gap-3 ${fx(250).className}`}
                    style={fx(250).style}
                    role="group"
                    aria-label="Filter products"
                >
                    {FILTERS.map((f) => {
                        const count = f === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === f).length;
                        const on = filter === f;
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                aria-pressed={on}
                                className={`rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${on
                                    ? "border-white bg-white text-[#0a0a0a]"
                                    : "border-white/30 text-white hover:border-white hover:bg-white/10"
                                    }`}
                            >
                                {f} <span className={on ? "text-black/50" : "text-white/50"}>{count}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] [-ms-overflow-style:none] sm:mx-0 sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
                    style={{ WebkitOverflowScrolling: "touch", scrollPaddingLeft: "1.25rem" }}
                >
                    {list.map((item, i) => (
                        <article
                            key={item.name}
                            className={`group relative w-[68vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border bg-neutral-900 sm:w-[250px] sm:max-w-none lg:w-[280px] ${item.active ? "border-white/60" : "border-white/15"
                                } hover:border-white ${fx(300 + i * 150).className}`}
                            style={fx(300 + i * 150).style}
                        >
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                                {failed.has(item.name) ? (
                                    <div
                                        role="img"
                                        aria-label={item.name}
                                        className="font-display flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-8xl text-white/15"
                                    >
                                        {item.name.charAt(0)}
                                    </div>
                                ) : (
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        loading="lazy"
                                        onError={() => setFailed((prev) => new Set(prev).add(item.name))}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{item.name}</h3>
                                <p className="mt-2 text-xs leading-relaxed text-gray-300 sm:text-sm line-clamp-3">{item.desc}</p>

                                <a
                                    href={quoteLink(item.name)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0a0a0a] transition hover:bg-gray-200 hover:shadow-[0_0_24px_rgba(255,255,255,.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Request a quote
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Progress carousel */}
                <div
                    className={`mt-2 h-px w-full bg-white/15 ${fx(700).className}`}
                    style={fx(700).style}
                    aria-hidden="true"
                >
                    <div
                        className="h-px bg-white transition-[width] duration-300"
                        style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                </div>

                {/* Lihat semua */}
                <div
                    className={`mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center ${fx(800).className}`}
                    style={fx(800).style}
                >
                    <Link
                        href="/brosur"
                        className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-base font-semibold transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        See all products
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                    </Link>
                    <p className="text-sm text-gray-400">Need a different spice? Send us your request.</p>
                </div>
            </div>
        </section>
    );
}