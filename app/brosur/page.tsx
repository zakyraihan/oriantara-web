"use client"
import Image from "next/image";
import OriantaraLanding from "../components/header";
import { useState } from "react";


export default function BrosurPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>

            <div className="flex items-center justify-center w-screen h-screen bg-neutral-900 p-3">
                <div className="w-full max-w-5xl h-full sm:h-[90%]">
                    <iframe
                        src="/oriantara_brosur.pdf"
                        className="w-full h-full rounded-xl shadow-xl border border-neutral-700"
                    ></iframe>
                </div>
            </div>
        </>
    );
}
