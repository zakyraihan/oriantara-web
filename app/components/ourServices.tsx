"use client"
import React, { useEffect, useRef, useState } from "react";

interface Service {
    title: string;
    desc: string;
    img: string;
    points: string[];
}

const SERVICES: Service[] = [
    {
        title: "Product Sourcing & Quality Control",
        desc: "We help international buyers source high-quality Indonesian raw materials, from spices to charcoal, while ensuring every batch meets export-grade quality standards.",
        img: "/assets/IMAGE REMPAH2.png",
        points: ["Spices to charcoal", "Export-grade quality checks"],
    },
    {
        title: "Export Management & Documentation",
        desc: "From handling permits to ensuring smooth customs clearance, we manage the entire export process, so you can focus on your business, not the paperwork.",
        img: "/assets/IMAGE CARGO.png",
        points: ["Permits", "Customs clearance"],
    },
    {
        title: "Global Logistics Coordination",
        desc: "We collaborate with trusted freight forwarders to ship your goods efficiently, securely, and on time, whether by sea, air, or land.",
        img: "/assets/IMAGE SHIP CG.png",
        points: ["Sea, air, or land", "Trusted freight forwarders"],
    },
];

// Ubah di sini jika nomor WhatsApp berubah
const WA_NUMBER = "6285780560420";
const waLink = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const EASE = "cubic-bezier(.22,.8,.2,1)";
const focusCls =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** true setelah elemen terlihat di layar (sekali saja) */
function useInView<T extends HTMLElement>(threshold = 0.2) {
    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setReduced(rm);
        const el = ref.current;
        if (!el) return;
        if (rm) {
            setInView(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);

    return { ref, inView, reduced };
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
    const { ref, inView, reduced } = useInView<HTMLDivElement>(0.25);
    const [imgFailed, setImgFailed] = useState(false);

    const fx = (delay: number) => ({
        className: `transition-all ${inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
        style: {
            transitionDuration: reduced ? "0ms" : "900ms",
            transitionDelay: reduced ? "0ms" : `${delay}ms`,
            transitionTimingFunction: EASE,
        } as React.CSSProperties,
    });

    return (
        <div
            ref={ref}
            data-row
            className="relative pb-16 pl-14 last:pb-0 sm:pl-16 lg:pb-24 lg:pl-24"
        >
            {/* Penanda langkah di garis timeline */}
            <span
                data-marker
                className="font-display absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[#0a0a0a] text-base font-bold text-white transition-all duration-500"
            >
                {index + 1}
            </span>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Teks */}
                <div className="lg:col-span-5">
                    <h3
                        className={`font-display text-2xl font-bold leading-tight sm:text-3xl ${fx(0).className}`}
                        style={fx(0).style}
                    >
                        {service.title}
                    </h3>
                    <p
                        className={`mt-4 text-base leading-relaxed text-gray-300 ${fx(150).className}`}
                        style={fx(150).style}
                    >
                        {service.desc}
                    </p>

                    <ul
                        className={`mt-5 flex flex-wrap gap-2 ${fx(300).className}`}
                        style={fx(300).style}
                    >
                        {service.points.map((p) => (
                            <li
                                key={p}
                                className="rounded-full border border-white/25 px-3.5 py-1.5 text-xs text-gray-200 sm:text-sm"
                            >
                                {p}
                            </li>
                        ))}
                    </ul>

                    <a
                        href={waLink(`Hello Oriantara, I would like to discuss: ${service.title}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white ${fx(450).className} ${focusCls}`}
                        style={fx(450).style}
                    >
                        <span className="border-b border-white/40 pb-0.5 transition-colors group-hover:border-white">
                            Discuss this service
                        </span>
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                    </a>
                </div>

                {/* Gambar: terbuka dari kanan ke kiri */}
                <div className="order-first lg:order-none lg:col-span-7">
                    <div
                        className="group relative aspect-[16/10] w-full overflow-hidden border border-white/15 bg-neutral-900"
                        style={{
                            borderRadius: 20,
                            clipPath: inView ? "inset(0% 0% 0% 0% round 20px)" : "inset(0% 0% 0% 100% round 20px)",
                            transition: reduced ? "none" : `clip-path 1.2s ${EASE}`,
                        }}
                    >
                        {imgFailed ? (
                            <div
                                role="img"
                                aria-label={service.title}
                                className="font-display flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-9xl text-white/15"
                            >
                                {index + 1}
                            </div>
                        ) : (
                            <img
                                src={service.img}
                                alt={service.title}
                                loading="lazy"
                                onError={() => setImgFailed(true)}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const OurServices: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);
    const head = useInView<HTMLDivElement>(0.3);

    // Garis timeline terisi mengikuti scroll, penanda menyala saat dicapai
    useEffect(() => {
        const list = listRef.current;
        const fill = fillRef.current;
        if (!list || !fill) return;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let raf = 0;
        const update = () => {
            const vh = window.innerHeight;
            const r = list.getBoundingClientRect();
            const prog = reducedMotion ? 1 : Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
            fill.style.height = `${prog * 100}%`;

            list.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
                const marker = row.querySelector<HTMLElement>("[data-marker]");
                if (!marker) return;
                const reached = row.offsetTop + 20 <= prog * list.offsetHeight + 1;
                marker.style.background = reached ? "#ffffff" : "#0a0a0a";
                marker.style.color = reached ? "#0a0a0a" : "#ffffff";
                marker.style.boxShadow = reached ? "0 0 20px rgba(255,255,255,.45)" : "none";
            });
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

    const hfx = (delay: number) => ({
        className: `transition-all ${head.inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"}`,
        style: {
            transitionDuration: head.reduced ? "0ms" : "900ms",
            transitionDelay: head.reduced ? "0ms" : `${delay}ms`,
            transitionTimingFunction: EASE,
        } as React.CSSProperties,
    });

    return (
        <section
            id="services"
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
                <div ref={head.ref} className="mb-16 max-w-2xl lg:mb-20">
                    <h2
                        className={`font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl ${hfx(0).className}`}
                        style={hfx(0).style}
                    >
                        Our services
                    </h2>
                    <p
                        className={`mt-5 text-lg leading-relaxed text-gray-300 ${hfx(150).className}`}
                        style={hfx(150).style}
                    >
                        From the first batch to the final port, we connect buyers with high-quality products and handle
                        the logistics worldwide.
                    </p>
                </div>

                {/* Alur layanan: urutan nyata, jadi memakai langkah bernomor */}
                <div ref={listRef} className="relative">
                    <div className="absolute left-5 top-0 h-full w-px bg-white/15" aria-hidden="true" />
                    <div ref={fillRef} className="absolute left-5 top-0 w-px bg-white" style={{ height: 0 }} aria-hidden="true" />

                    {SERVICES.map((s, i) => (
                        <ServiceRow key={s.title} service={s} index={i} />
                    ))}
                </div>

                {/* Penutup */}
                <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:mt-20">
                    <a
                        href={waLink("Hello Oriantara, I would like to know more about your services.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#0a0a0a] transition hover:bg-gray-200 hover:shadow-[0_0_32px_rgba(255,255,255,.35)] ${focusCls}`}
                    >
                        Talk to our team
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                    </a>
                    <p className="text-sm text-gray-400">Tell us what you need to source or ship.</p>
                </div>
            </div>
        </section>
    );
};

export default OurServices;