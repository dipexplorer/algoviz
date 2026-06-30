import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoViz - Advanced Algorithm Visualizer",
  description: "A holographic, futuristic data structure and algorithm visualization platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white selection:bg-[#00F0FF] selection:text-black min-h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
