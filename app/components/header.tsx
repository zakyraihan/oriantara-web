"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';



export default function OriantaraLanding() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    var router = useRouter()

    const words = [
        "SPICES EXPORTER",
        "HERBS SUPPLIER",
        "PREMIUM SEASONINGS",
        "COMMODITIES",
        "ORGANIC SPICE",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000); // ganti setiap 2 detik

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen  text-white">


            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50  backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            {/* <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                            </div> */}
                            <Image src={"/assets/LOGO.png"} alt={'logo'} width={190} height={190} />
                            {/* <div>
                                <div className="text-lg font-bold tracking-wider">ORIANTARA</div>
                                <div className="text-xs text-gray-400">GROUP</div>
                            </div> */}
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-sm font-medium hover:text-amber-500 transition-colors">
                                HOME
                            </a>
                            <a href="#about" className="text-sm font-medium hover:text-amber-500 transition-colors">
                                ABOUT
                            </a>
                            <a href="#product" className="text-sm font-medium hover:text-amber-500 transition-colors">
                                PRODUCT
                            </a>
                            <a href="#services" className="text-sm font-medium hover:text-amber-500 transition-colors">
                                OUR SERVICES
                            </a>

                            <a
                                href="https://wa.me/6285780560420"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer px-6 py-2 border border-amber-600 text-amber-500 rounded-full text-sm font-medium hover:bg-amber-600 hover:text-white transition-all"
                            >
                                CONTACT US
                            </a>


                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2"
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

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 space-y-4">
                            <a href="#home" className="block text-sm font-medium hover:text-amber-500">HOME</a>
                            <a href="#about" className="block text-sm font-medium hover:text-amber-500">ABOUT</a>
                            <a href="#product" className="block text-sm font-medium hover:text-amber-500">PRODUCT</a>
                            <a href="#services" className="block text-sm font-medium hover:text-amber-500">OUR SERVICES</a>
                            <button className="w-full px-6 py-2 border border-amber-600 text-amber-500 rounded-full text-sm font-medium">
                                CONTACT US
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

                {/* Background Video */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/assets/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

                {/* Spice Glow Overlay */}
                <div className="absolute inset-0 opacity-25">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-amber-600/40 rounded-full blur-3xl animate-pulse"></div>
                    <div
                        className="absolute bottom-20 right-10 w-40 h-40 bg-orange-600/40 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-600/40 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20 fade-in">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        INDONESIA PREMIUM
                        <br />
                        <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
                            {words[index]}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Bringing Authentic Flavors From Indonesia To The World — From Tradition To Taste
                    </p>

                    <button
                        onClick={() => router.push("/brosur")}
                        className="px-6 py-2 bg-amber-600 text-white rounded-full"
                    >
                        Download Brosur
                    </button>

                    <div className="mt-16 flex justify-center space-x-8 opacity-80">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-500">50+</div>
                            <div className="text-sm text-gray-300">Countries Served</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-amber-500">100%</div>
                            <div className="text-sm text-gray-300">Premium Quality</div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}