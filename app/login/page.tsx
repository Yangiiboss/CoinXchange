"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Apple, ScanFace } from "lucide-react";
import Link from "next/link";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0a0a] text-white">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-10 h-10 text-white"
                        >
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome to CoinXchange</h1>
                    <p className="text-gray-400">Convert Crypto to Naira instantly and securely.</p>
                </div>

                {/* Toggle */}
                <div className="bg-white/5 p-1 rounded-xl flex">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${isLogin ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${!isLogin ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email or Phone Number"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">
                            Forgot Password?
                        </Link>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                        {isLogin ? "Log In" : "Sign Up"}
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="flex justify-center">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ScanFace className="w-5 h-5" />
                            <span className="text-sm">Login with Face ID</span>
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">Or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                </div>

                {/* Socials */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-4 transition-all">
                        <Apple className="w-5 h-5" />
                        <span>Apple</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-4 transition-all">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span>Google</span>
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-8">
                    By continuing, you agree to our{" "}
                    <Link href="#" className="text-blue-500 hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-500 hover:underline">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
