import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CoinXchange – Nigeria’s Fastest Crypto-to-Bank",
    description: "Instant crypto-to-naira exchange with the best rates.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-black text-white min-h-screen`}>
                <Navbar />
                <div className="pt-16">
                    {children}
                </div>
            </body>
        </html>
    );
}
