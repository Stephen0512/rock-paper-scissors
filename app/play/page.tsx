"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function PlayPage() {
    const router = useRouter()
    const { data: session } = authClient.useSession()
    const [showAuthModal, setShowAuthModal] = useState(false)

    const handleGameModeClick = (path: string) => {
        if (!session) {
            setShowAuthModal(true)
            return
        }
        router.push(path)
    }

    return (
        <main className="absolute inset-0 flex p-4">
            {/* Background Design - Reusing the same background from auth page */}
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

            {/* Header with Leaderboard Link */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                <div></div> {/* Empty div for spacing */}
                <Link href="/leaderboard">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-[#00C2FF] to-[#7D00FF] text-white rounded-xl font-bold hover:opacity-90 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        Leaderboard
                    </motion.button>
                </Link>
            </div>

            {/* Left Side - Game Mode Selection */}
            <div className="relative w-1/2 p-8 flex flex-col justify-center">
                <div className="text-center space-y-2 mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Choose Your Game Mode</h1>
                    <p className="text-gray-300 text-lg">Select how you want to play Rock Paper Scissors</p>
                </div>

                <div className="space-y-8 max-w-xl mx-auto">
                    {/* PvE Mode Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group cursor-pointer"
                        onClick={() => handleGameModeClick('/play/pve')}
                    >
                        <div className="bg-[#1A1A2E]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#00C2FF] to-[#7D00FF] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Player vs AI</h2>
                                    <p className="text-gray-300 text-sm mt-1">Challenge our AI opponent in a classic game of Rock Paper Scissors. Test your skills against our intelligent algorithm!</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* PvP Mode Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group cursor-pointer"
                        onClick={() => handleGameModeClick('/play/pvp')}
                    >
                        <div className="bg-[#1A1A2E]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#00C2FF] to-[#7D00FF] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Player vs Player</h2>
                                    <p className="text-gray-300 text-sm mt-1">Play against your friends in real-time! Challenge them to a game and see who comes out on top.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Play Online Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative group cursor-pointer"
                        onClick={() => handleGameModeClick('/play/online')}
                    >
                        <div className="bg-[#1A1A2E]/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#00C2FF] to-[#7D00FF] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Play Online</h2>
                                    <p className="text-gray-300 text-sm mt-1">Connect with players worldwide in our global multiplayer mode. Show them you are the best player!</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Video Space */}
            <div className="relative w-1/2 p-8 flex items-center justify-center">
                <video 
                    className="w-full h-full object-contain rounded-2xl"
                    autoPlay
                    muted
                    playsInline
                    loop
                >
                    <source src="/video.mov" type="video/quicktime" />
                    <source src="/video.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Auth Modal */}
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
                            <div className="flex flex-col gap-4">
                                <Link href="/auth/sign-in">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-[#00C2FF] to-[#7D00FF] text-white rounded-xl font-bold hover:opacity-90"
                                    >
                                        Sign In
                                    </motion.button>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowAuthModal(false)}
                                    className="w-full px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
} 