"use client";
import React, { useEffect, useRef, useState } from "react";
import { Fraunces, Manrope } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

const JOURNEY = [
    { title: "Coconut-based products", text: "Where it began: charcoal and briquettes." },
    { title: "Premium spices", text: "Our focus today: nutmeg, clove, cinnamon, and more." },
    { title: "Coffee, cocoa and beyond", text: "Where we are growing: more of Indonesia's globally valued resources." },
];

const VALUES = [
    { title: "Integrity", text: "Honest dealings in every shipment." },
    { title: "Long-term partnerships", text: "We build relationships, not one-off orders." },
    { title: "Excellence", text: "Consistent quality, batch after batch." },
    { title: "Transparency", text: "Clear communication from farm to port." },
];

const WA = "https://wa.me/6285780560420";
const EASE = "cubic-bezier(.22,.8,.2,1)";

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLOListElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [reduced, setReduced] = useState(false);

    // Trigger the entrance sequence when the section scrolls into view
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
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Scroll-linked effects: image parallax, drifting background text, timeline fill
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const section = sectionRef.current;
        const img = imageRef.current;
        if (!section || !img) return;

        let raf = 0;
        const update = () => {
            const vh = window.innerHeight;

            // Image parallax
            const wrap = img.parentElement as HTMLElement;
            const r = wrap.getBoundingClientRect();
            const p = (r.top + r.height / 2 - vh / 2) / vh;
            img.style.transform = `translate3d(0, ${p * -70}px, 0) scale(1.18)`;

            // Large outlined background text drifts sideways
            const s = section.getBoundingClientRect();
            const sp = (vh - s.top) / (s.height + vh);
            if (bgTextRef.current) {
                bgTextRef.current.style.transform = `translate3d(${(0.5 - sp) * 380}px, 0, 0)`;
            }

            // Timeline line fills as you scroll; dots light up when reached
            const tl = timelineRef.current;
            if (tl && fillRef.current) {
                const t = tl.getBoundingClientRect();
                const prog = Math.min(1, Math.max(0, (vh * 0.7 - t.top) / t.height));
                fillRef.current.style.height = `${prog * 100}%`;
                tl.querySelectorAll<HTMLElement>("[data-dot]").forEach((dot) => {
                    const reached = dot.offsetTop <= prog * t.height;
                    dot.style.background = reached ? "#ffffff" : "#0a0a0a";
                    dot.style.boxShadow = reached ? "0 0 14px rgba(255,255,255,.7)" : "none";
                });
            }
            raf = 0;
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    // Fade + rise + un-blur, staggered by delay
    const fx = (delay: number, from = "translate-y-8") => ({
        className: `transition-all ${
            visible ? "opacity-100 translate-x-0 translate-y-0 blur-0" : `opacity-0 ${from} blur-sm`
        }`,
        style: {
            transitionDuration: reduced ? "0ms" : "900ms",
            transitionDelay: reduced ? "0ms" : `${delay}ms`,
            transitionTimingFunction: EASE,
        } as React.CSSProperties,
    });

    const headingWords = ["Who", "we", "are"];

    return (
        <section
            id="about"
            ref={sectionRef}
            className={`${body.className} relative overflow-hidden bg-[#0a0a0a] py-24 lg:py-32 text-[#f5f5f5]`}
        >
            {/* Faint grid texture */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                }}
            />

            {/* Outlined background word that drifts as you scroll */}
            <div
                aria-hidden="true"
                ref={bgTextRef}
                className={`${display.className} pointer-events-none absolute top-10 -left-40 select-none whitespace-nowrap text-[14rem] font-bold leading-none will-change-transform lg:text-[22rem]`}
                style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.08)" }}
            >
                ORIANTARA
            </div>

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* IMAGE: curtain reveal from bottom, then parallax */}
                    <div className="lg:col-span-5">
                        <div
                            className="relative h-[420px] overflow-hidden border border-white/15 lg:sticky lg:top-28 lg:h-[640px]"
                            style={{
                                clipPath: visible ? "inset(0% 0% 0% 0% round 24px)" : "inset(100% 0% 0% 0% round 24px)",
                                transition: reduced ? "none" : `clip-path 1.3s ${EASE}`,
                                borderRadius: 24,
                            }}
                        >
                            <div
                                ref={imageRef}
                                className="absolute inset-0 bg-cover bg-center will-change-transform"
                                style={{ backgroundImage: "url('/assets/INDONESIA.png')", transform: "scale(1.18)" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                            <figure className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                                <blockquote
                                    className={`${display.className} text-xl leading-snug sm:text-2xl ${fx(900).className}`}
                                    style={fx(900).style}
                                >
                                    Every product reflects the richness of Indonesia's land and the dedication of its local farmers.
                                </blockquote>
                            </figure>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="lg:col-span-7">
                        {/* Heading: each word slides up from behind a mask */}
                        <h2 className={`${display.className} text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl`}>
                            {headingWords.map((w, i) => (
                                <span key={w} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                                    <span
                                        className="inline-block"
                                        style={{
                                            transform: visible ? "translateY(0)" : "translateY(110%)",
                                            transition: reduced ? "none" : `transform 1s ${EASE} ${300 + i * 120}ms`,
                                        }}
                                    >
                                        {w}
                                    </span>
                                </span>
                            ))}
                        </h2>

                        <p
                            className={`${display.className} mt-6 max-w-2xl text-xl leading-relaxed text-white sm:text-2xl ${fx(700).className}`}
                            style={fx(700).style}
                        >
                            A trusted exporter of premium Indonesian natural commodities.
                        </p>

                        <div
                            className={`mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-gray-300 ${fx(850).className}`}
                            style={fx(850).style}
                        >
                            <p>
                                Oriantara Commodities now focuses on high-quality spices such as nutmeg, clove, and
                                cinnamon. We started with coconut-based products like charcoal and briquettes, and
                                we continue to grow into coffee, cocoa, and other resources the world values.
                            </p>
                            <p>
                                We work through integrity, long-term partnerships, and a commitment to excellence.
                                With consistency and transparency, we aim to raise Indonesia's presence in the
                                global market.
                            </p>
                        </div>

                        {/* Timeline: line fills as you scroll */}
                        <ol
                            ref={timelineRef}
                            className={`relative mt-12 max-w-2xl pl-8 ${fx(1000).className}`}
                            style={fx(1000).style}
                        >
                            <div className="absolute left-0 top-0 h-full w-px bg-white/15" />
                            <div ref={fillRef} className="absolute left-0 top-0 w-px bg-white" style={{ height: 0 }} />
                            {JOURNEY.map((step) => (
                                <li key={step.title} className="relative pb-8 last:pb-0">
                                    <span
                                        data-dot
                                        className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border border-white transition-all duration-500"
                                        style={{ background: "#0a0a0a" }}
                                    />
                                    <h3 className={`${display.className} text-xl`}>{step.title}</h3>
                                    <p className="mt-1 text-sm text-gray-400">{step.text}</p>
                                </li>
                            ))}
                        </ol>

                        {/* Values: slide in from the left, top lines draw across */}
                        <ul className="mt-12 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                            {VALUES.map((v, i) => (
                                <li
                                    key={v.title}
                                    className={`relative pt-4 ${fx(1150 + i * 120, "-translate-x-8").className}`}
                                    style={fx(1150 + i * 120, "-translate-x-8").style}
                                >
                                    <span
                                        className="absolute left-0 top-0 h-px w-full origin-left bg-white/30"
                                        style={{
                                            transform: visible ? "scaleX(1)" : "scaleX(0)",
                                            transition: reduced ? "none" : `transform 1s ${EASE} ${1250 + i * 120}ms`,
                                        }}
                                    />
                                    <h3 className="text-base font-semibold">{v.title}</h3>
                                    <p className="mt-1 text-sm text-gray-400">{v.text}</p>
                                </li>
                            ))}
                        </ul>

                        <div
                            className={`mt-12 flex flex-col gap-4 sm:flex-row sm:items-center ${fx(1700).className}`}
                            style={fx(1700).style}
                        >
                            <a
                                href="#more-about"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#0a0a0a] transition hover:bg-gray-200 hover:shadow-[0_0_32px_rgba(255,255,255,.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                More about us
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                                </svg>
                            </a>
                            <a
                                href={WA}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-base font-semibold transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Talk to our team
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}