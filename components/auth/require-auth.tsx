"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { AuthCard } from "@daveyplate/better-auth-ui"
import { motion, AnimatePresence } from "framer-motion"

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { data: session, isPending } = authClient.useSession()
    const [showAuthModal, setShowAuthModal] = useState(false)

    useEffect(() => {
        if (!isPending && !session) {
            setShowAuthModal(true)
        }
    }, [session, isPending])

    if (isPending) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        )
    }

    return (
        <>
            {children}
            <AnimatePresence>
                {showAuthModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#1A1A2E] rounded-2xl p-6 w-full max-w-md relative"
                        >
                            <button
                                onClick={() => setShowAuthModal(false)}
                                className="absolute top-4 right-4 text-white/60 hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
                                <p className="text-gray-300 mt-2">Please sign in to play the game</p>
                            </div>
                            <div className="[&_.auth-card]:bg-transparent [&_.auth-card]:shadow-none [&_input]:bg-white [&_input]:border-white/20 [&_input]:text-black [&_input]:placeholder-gray-500 [&_button]:bg-gradient-to-r [&_button]:from-[#00C2FF] [&_button]:to-[#7D00FF] [&_button]:hover:opacity-90">
                                <AuthCard pathname="sign-in" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
} 