import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oriantara | Indonesian Spices Exporter",
  description:
    "Oriantara Group is a trusted exporter of premium Indonesian spices and natural commodities: nutmeg, clove, cinnamon, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fraunces + Manrope dimuat di browser, bukan saat build, jadi build tidak gagal kalau server tidak bisa akses Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;500;600&display=swap"
        />
        <style>{`
          .font-display { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; }
          .font-body { font-family: 'Manrope', var(--font-geist-sans), system-ui, sans-serif; }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}