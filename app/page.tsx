import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10" />

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Crypto to Naira, <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Instantly.
                </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                CoinXchange is Nigeria’s fastest off-ramp. Best rates, zero hidden fees, and instant bank payouts.
            </p>

            <div className="flex gap-4">
                <Link
                    href="/login"
                    className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                >
                    Get Started
                </Link>
                <Link
                    href="/history"
                    className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                    View Rates
                </Link>
            </div>
        </main>
    );
}
