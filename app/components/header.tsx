"use client"
import { TextShimmer } from '@/components/motion-primitives/text-shimmer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Fraunces, Manrope } from 'next/font/google';

const display = Fraunces({ subsets: ['latin'], weight: ['600', '700'], display: 'swap' });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

const WORDS = [
    "SPICES EXPORTER",
    "HERBS SUPPLIER",
    "SEASONINGS",
    "COMMODITIES",
    "ORGANIC SPICE",
];

const SPICES = [
    "Nutmeg", "Cloves", "Cinnamon", "Black Pepper", "Turmeric",
    "Vanilla", "Ginger", "Cardamom", "Mace", "Lemongrass",
];

const NAV = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Product", href: "#product" },
    { label: "Our Services", href: "#services" },
];

const WA = "https://wa.me/6285780560420";
const WA_QUOTE = `${WA}?text=${encodeURIComponent("Hello Oriantara, I would like to request a quotation.")}`;

export default function OriantaraLanding() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Typewriter
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = WORDS[wordIndex];
        let timer: ReturnType<typeof setTimeout> | undefined;

        if (!isDeleting && displayText === current) {
            timer = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % WORDS.length);
        } else {
            timer = setTimeout(
                () => setDisplayText(current.substring(0, displayText.length + (isDeleting ? -1 : 1))),
                isDeleting ? 55 : 105
            );
        }
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, wordIndex]);

    // Navbar turns solid after scrolling
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className={`${body.className} min-h-screen bg-[#0a0a0a] text-[#f5f5f5]`}>
            <style>{`
                @keyframes rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                @keyframes drift { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-18px,0); } }
                .rise { opacity: 0; animation: rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
                .marquee-track { animation: marquee 38s linear infinite; }
                .drift { animation: drift 9s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .rise { opacity: 1; animation: none; }
                    .marquee-track, .drift { animation: none; }
                }
            `}</style>

            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#ffffff]/20 shadow-lg shadow-black/30"
                        : "bg-gradient-to-b from-black/60 to-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
                        <a href="#home" aria-label="Oriantara home">
                            <Image
                                src="/assets/LOGO.png"
                                alt="Oriantara logo"
                                width={190}
                                height={190}
                                priority
                                className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-14"}`}
                            />
                        </a>

                        <div className="hidden md:flex items-center gap-9">
                            {NAV.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="group relative text-sm font-medium tracking-wide text-[#f5f5f5]/70 hover:text-white transition-colors"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#ffffff] transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}
                            <a
                                href={WA}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-[#ffffff] px-6 py-2.5 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#d4d4d4] hover:shadow-[0_0_24px_rgba(255,255,255,.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffffff]"
                            >
                                Contact us
                            </a>
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden py-5 space-y-4 border-t border-[#ffffff]/20 bg-[#0a0a0a]/95">
                            {NAV.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-base font-medium hover:text-[#ffffff]"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href={WA}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full rounded-full bg-[#ffffff] px-6 py-2.5 text-center text-sm font-semibold text-[#0a0a0a]"
                            >
                                Contact us
                            </a>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    src="/assets/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Warm overlay + vignette so text stays readable on any video frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/45 to-[#0a0a0a]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,.7)_100%)]" />

                {/* Soft spice glow, slow floating */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="drift absolute top-24 left-[8%] h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    <div className="drift absolute bottom-40 right-[8%] h-52 w-52 rounded-full bg-white/10 blur-3xl" style={{ animationDelay: "2s" }} />
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-5 pt-28 pb-44 text-center">
                    <p
                        className="rise mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#ffffff]/40 bg-black/30 px-4 py-1.5 text-sm text-[#d4d4d4] backdrop-blur"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ffffff]" />
                        Direct from Indonesia, shipped worldwide
                    </p>

                    <h1
                        className={`${display.className} rise text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-7xl font-bold tracking-tight`}
                        style={{ animationDelay: "0.25s" }}
                    >
                        Indonesia Premium
                        <span className="mt-2 block min-h-[1.15em]">
                            <TextShimmer
                                as="span"
                                duration={1.4}
                                className="text-[2.1rem] sm:text-5xl lg:text-6xl [--base-color:#9ca3af] [--base-gradient-color:#ffffff] dark:[--base-color:#9ca3af] dark:[--base-gradient-color:#ffffff]"
                            >
                                {displayText || "\u00A0"}
                            </TextShimmer>
                        </span>
                    </h1>

                    <p
                        className="rise mx-auto mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-[#f5f5f5]/85"
                        style={{ animationDelay: "0.45s" }}
                    >
                        Bringing authentic flavors from Indonesia to the world. From tradition to taste.
                    </p>

                    <div
                        className="rise mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                        style={{ animationDelay: "0.65s" }}
                    >
                        <button
                            onClick={() => router.push("/brosur")}
                            className="w-full sm:w-auto rounded-full bg-[#ffffff] px-9 py-3.5 text-base font-semibold text-[#0a0a0a] transition hover:bg-[#d4d4d4] hover:shadow-[0_0_32px_rgba(255,255,255,.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffffff]"
                        >
                            Explore products
                        </button>
                        <a
                            href={WA_QUOTE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto rounded-full border border-[#f5f5f5]/50 bg-black/20 px-9 py-3.5 text-base font-semibold backdrop-blur transition hover:border-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffffff]"
                        >
                            Request a quote
                        </a>
                    </div>

                    <dl
                        className="rise mt-14 mx-auto flex max-w-md items-stretch justify-center divide-x divide-[#f5f5f5]/25 rounded-2xl border border-[#f5f5f5]/15 bg-black/30 py-5 backdrop-blur"
                        style={{ animationDelay: "0.85s" }}
                    >
                        <div className="flex-1 px-6">
                            <dt className="sr-only">Countries served</dt>
                            <dd className={`${display.className} text-4xl font-bold text-[#ffffff]`}>50+</dd>
                            <p className="mt-1 text-sm text-[#f5f5f5]/75">Countries served</p>
                        </div>
                        <div className="flex-1 px-6">
                            <dt className="sr-only">Quality</dt>
                            <dd className={`${display.className} text-4xl font-bold text-[#ffffff]`}>100%</dd>
                            <p className="mt-1 text-sm text-[#f5f5f5]/75">Premium quality</p>
                        </div>
                    </dl>
                </div>

                {/* Spice marquee */}
                <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-[#ffffff]/25 bg-[#0a0a0a]/70 backdrop-blur-sm overflow-hidden" aria-hidden="true">
                    <div className="marquee-track flex w-max whitespace-nowrap py-4">
                        {[...SPICES, ...SPICES].map((s, i) => (
                            <span key={i} className={`${display.className} flex items-center text-xl text-[#d4d4d4]/90`}>
                                <span className="px-8">{s}</span>
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ffffff]" />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <a
                    href="#about"
                    aria-label="Scroll down"
                    className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 md:block"
                >
                    <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/60">
                        <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-white/80" />
                    </div>
                </a>
            </section>
        </div>
    );
}