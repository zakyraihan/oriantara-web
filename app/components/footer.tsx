"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ===== Data kontak: ubah di sini saja =====
const EMAIL = "oriantaragroup@gmail.com";
const PHONE_DISPLAY = "+62-857-8056-0420";
const PHONE_TEL = "+6285780560420";
const WA_NUMBER = "6285780560420";
const WA_QUOTE = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello Oriantara, I would like to request a quote.")}`;

const COMPANY_LINKS = [
    { label: "Home", href: "#home" },
    { label: "About us", href: "#about" },
    { label: "Products", href: "#product" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
];

const SOCIALS = [
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
        label: "Instagram",
        href: "https://instagram.com",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
        label: "TikTok",
        href: "https://tiktok.com",
        path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
    },
    {
        label: "WhatsApp",
        href: `https://wa.me/${WA_NUMBER}`,
        path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
    },
];

const EASE = "cubic-bezier(.22,.8,.2,1)";
const focusCls =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Footer() {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setReduced(rm);
        const el = ref.current;
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
            { threshold: 0.1 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const fx = (delay: number) => ({
        className: `transition-all ${visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
        style: {
            transitionDuration: reduced ? "0ms" : "900ms",
            transitionDelay: reduced ? "0ms" : `${delay}ms`,
            transitionTimingFunction: EASE,
        } as React.CSSProperties,
    });

    return (
        <footer
            id="contact"
            ref={ref}
            className="font-body relative overflow-hidden bg-[#0a0a0a] text-[#f5f5f5]"
        >
            {/* Tekstur grid halus */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
                }}
            />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                {/* CTA */}
                <div className="flex flex-col gap-8 border-b border-white/15 py-16 md:flex-row md:items-center md:justify-between lg:py-20">
                    <div className={`max-w-2xl ${fx(0).className}`} style={fx(0).style}>
                        <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
                            Ready to source premium Indonesian commodities?
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                            Tell us what you need and we will get back to you with a quote.
                        </p>
                    </div>

                    <div
                        className={`flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row ${fx(150).className}`}
                        style={fx(150).style}
                    >
                        <a
                            href={WA_QUOTE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#0a0a0a] transition hover:bg-gray-200 hover:shadow-[0_0_32px_rgba(255,255,255,.35)] ${focusCls}`}
                        >
                            Request a quote
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                            </svg>
                        </a>
                        <a
                            href={`mailto:${EMAIL}`}
                            className={`inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3.5 text-base font-semibold transition hover:border-white hover:bg-white/10 ${focusCls}`}
                        >
                            Email us
                        </a>
                    </div>
                </div>

                {/* Kolom informasi */}
                <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    {/* Brand */}
                    <div className={`lg:col-span-5 ${fx(250).className}`} style={fx(250).style}>
                        <div className="flex items-center gap-3">
                            <Image src="/assets/logo2.png" alt="Oriantara logo" width={50} height={50} />
                            <span className="font-display text-xl font-bold tracking-wide">Oriantara Commodities</span>
                        </div>
                        <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-300">
                            A national export company dedicated to delivering premium Indonesian natural commodities,
                            with a core focus on high-quality spices, coffee, and cocoa. We uphold international
                            standards, sustainability, and supply chain efficiency to serve the global market with
                            excellence.
                        </p>
                    </div>

                    {/* Company */}
                    <nav aria-label="Company" className={`lg:col-span-2 ${fx(350).className}`} style={fx(350).style}>
                        <h3 className="text-base font-semibold">Company</h3>
                        <ul className="mt-5 space-y-3">
                            {COMPANY_LINKS.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        className={`group inline-flex items-center text-sm text-gray-300 transition-colors hover:text-white ${focusCls}`}
                                    >
                                        <span className="mr-0 inline-block h-px w-0 bg-white transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Office */}
                    <div className={`lg:col-span-3 ${fx(450).className}`} style={fx(450).style}>
                        <h3 className="text-base font-semibold">Global office</h3>
                        <address className="mt-5 space-y-3 text-sm not-italic text-gray-300">
                            <p>Jakarta, Indonesia</p>
                            <p>
                                <a href={`mailto:${EMAIL}`} className={`transition-colors hover:text-white ${focusCls}`}>
                                    {EMAIL}
                                </a>
                            </p>
                            <p>
                                <a href={`tel:${PHONE_TEL}`} className={`transition-colors hover:text-white ${focusCls}`}>
                                    {PHONE_DISPLAY}
                                </a>
                            </p>
                        </address>
                    </div>

                    {/* Social */}
                    <div className={`lg:col-span-2 ${fx(550).className}`} style={fx(550).style}>
                        <h3 className="text-base font-semibold">Connect with us</h3>
                        <ul className="mt-5 flex flex-wrap gap-3">
                            {SOCIALS.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        title={s.label}
                                        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-gray-300 transition hover:border-white hover:bg-white hover:text-[#0a0a0a] ${focusCls}`}
                                    >
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d={s.path} />
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-6 sm:flex-row">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Oriantara Commodities. All rights reserved.
                    </p>
                    <a
                        href="#home"
                        className={`inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white ${focusCls}`}
                    >
                        Back to top
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m-6 6 6-6 6 6" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Wordmark outline besar (dekoratif) */}
            <div
                aria-hidden="true"
                className="font-display pointer-events-none select-none overflow-hidden whitespace-nowrap text-center text-[5.5rem] font-bold leading-[0.8] sm:text-[9rem] lg:text-[15rem]"
                style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,.1)", marginBottom: "-0.12em" }}
            >
                ORIANTARA
            </div>
        </footer>
    );
}