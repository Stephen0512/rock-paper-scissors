"use client"

import { AuthCard } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function AuthView({ pathname }: { pathname: string }) {
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [router])

    return (
        <main className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* Background Design */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Mountains */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#2A1B5D] to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 h-full bg-[url('/mountains.svg')] bg-cover bg-bottom opacity-50"></div>
                </div>
                {/* Stars */}
                <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-30"></div>
                {/* Clouds */}
                <div className="absolute inset-0 bg-[url('/clouds.svg')] bg-cover opacity-20"></div>
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md mx-4 bg-[#1A1A2E]/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Rock Paper Scissors</h1>
                    <p className="text-gray-300">
                        {pathname === "sign-up" ? "Sign up to start playing!" : "Sign in to start playing!"}
                    </p>
                </div>
                
                <div className="[&_.auth-card]:bg-transparent [&_.auth-card]:shadow-none [&_input]:bg-white [&_input]:border-white/20 [&_input]:text-black [&_input]:placeholder-gray-500 [&_button[type='submit']]:bg-gradient-to-r [&_button[type='submit']]:from-[#00C2FF] [&_button[type='submit']]:to-[#7D00FF] [&_button[type='submit']]:hover:opacity-90">
                    <AuthCard pathname={pathname} />
                </div>
            </div>

            <p className="relative mt-6 text-sm text-white/70">
                Created by{" "}
                <Link
                    className="text-white hover:text-white/80 transition-colors"
                    href="https://github.com/Stephen0512/rock-paper-scissors"
                    target="_blank"
                >
                    Stephen Shen, Zening Wang, Yuxiang Jiang
                </Link>
                {" "} - Cornell Tech MS Student
            </p>
        </main>
    )
}
