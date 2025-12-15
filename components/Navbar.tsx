"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="CoinXchange" className="w-8 h-8" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            CoinXchange
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <NavLink href="/dashboard" active={pathname === '/dashboard'}>Exchange</NavLink>
                        <NavLink href="/history" active={pathname === '/history'}>History</NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            Login
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, children, active }: { href: string, children: React.ReactNode, active: boolean }) {
    return (
        <Link
            href={href}
            className={clsx(
                "text-sm font-medium transition-colors relative",
                active ? "text-white" : "text-gray-400 hover:text-white"
            )}
        >
            {children}
            {active && (
                <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-5 left-0 right-0 h-0.5 bg-blue-500"
                />
            )}
        </Link>
    );
}
