"use client";
import React from "react";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                    {/* LEFT — TEXT */}
                    <div className="p-10 lg:p-14 text-white">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wide">
                            WHO WE ARE
                        </h2>

                        <p className="text-gray-300 leading-relaxed mb-6">
                            Oriantara Group is a trusted exporter of premium Indonesian natural
                            commodities — with a renewed focus on high–quality spices such as nutmeg,
                            clove, cinnamon, and more. Our journey began with coconut–based products
                            like charcoal and briquettes, and continues to expand into coffee, cocoa,
                            and other globally valued resources.
                        </p>

                        <p className="text-gray-300 leading-relaxed mb-8">
                            Rooted in integrity, long–term partnerships, and a commitment to excellence,
                            every product we deliver reflects the richness of Indonesia's land and the
                            dedication of its local farmers. Through consistency, transparency, and
                            meaningful impact, we aim to elevate Indonesia’s presence in the global market.
                        </p>

                        <a
                            href="#more-about"
                            className="text-amber-400 font-semibold hover:text-amber-500 transition-all inline-flex items-center"
                        >
                            More About Us <span className="ml-2">➜</span>
                        </a>
                    </div>

                    {/* RIGHT — PARALLAX BACKGROUND */}
                    <div
                        className="relative bg-fixed bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/assets/INDONESIA.png')`,
                            backgroundAttachment: "fixed",
                        }}
                    >
                        {/* BLACK OVERLAY */}
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* HEIGHT */}
                        <div className="relative h-80 lg:h-full"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
