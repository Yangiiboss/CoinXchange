import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                NairaAI 2.0
            </h1>
            <p className="text-xl text-gray-300 mb-8">
                The Fastest Crypto-to-Naira Off-Ramp.
            </p>

            <div className="glass-card p-8 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
                <Link href="/dashboard">
                    <button className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-bold hover:scale-105 transition-transform">
                        Login with Google
                    </button>
                </Link>
                <div className="text-sm text-gray-400">
                    Or <span className="underline cursor-pointer">Sign up with Email</span>
                </div>
            </div>
        </main>
    );
}
