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

    return (
        <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto text-center">

                {/* Title */}
                <h2 className="text-4xl font-extrabold tracking-wide mb-14 drop-shadow-lg">
                    FEATURED PRODUCT
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

                    {products.map((p, i) => (
                        <div
                            key={i}
                            className={`relative bg-gradient-to-b from-[#818181] to-[#373737] 
                rounded-xl p-10 shadow-2xl transition-all duration-300 hover:-translate-y-2 
                ${p.active ? "border-4 border-white shadow-blue-500/40" : "border border-gray-600"}`}
                        >
                            <img src={p.img} alt={p.name} className="w-40 h-40 mx-auto mb-6 object-contain" />

                            <h3 className="text-xl font-bold mb-3">{p.name}</h3>

                            <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
                        </div>
                    ))}

                </div>

                {/* See All */}
                <div className="mt-10">
                    <button className="text-gray-300 hover:text-white underline text-sm">
                        See All Product
                    </button>
                </div>
            </div>
        </section>
    );
}
