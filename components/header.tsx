"use client"

import Link from "next/link"
import Image from "next/image"
import { UserButton } from "@daveyplate/better-auth-ui"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <header className="sticky top-0 z-50 bg-[#1A1A2E]/80 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-8">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 text-white hover:text-white/90 transition-colors">
                        <Image
                            src="/logo.svg"
                            alt="Rock Paper Scissors Logo"
                            width={32}
                            height={32}
                            className="sm:w-8 sm:h-8"
                        />
                        <span className="font-bold text-base sm:text-lg">Rock Paper Scissors</span>
                    </Link>
                    
                    <nav className="hidden sm:flex items-center gap-2">
                        <Link href="/play">
                            <Button 
                                variant="ghost" 
                                className="text-white hover:text-white hover:bg-white/10"
                            >
                                Play Game
                            </Button>
                        </Link>
                        <Link href="/leaderboard">
                            <Button 
                                variant="ghost"
                                className="text-white hover:text-white hover:bg-white/10"
                            >
                                Leaderboard
                            </Button>
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        className="sm:hidden text-white hover:text-white hover:bg-white/10 p-2 rounded"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <UserButton />
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-[#1A1A2E]/80 backdrop-blur-sm border-t border-white/10">
                    <nav className="flex flex-col items-center gap-2 py-4">
                        <Link href="/play" className="text-white hover:text-white hover:bg-white/10 px-4 py-2 rounded">
                            Play Game
                        </Link>
                        <Link href="/leaderboard" className="text-white hover:text-white hover:bg-white/10 px-4 py-2 rounded">
                            Leaderboard
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
