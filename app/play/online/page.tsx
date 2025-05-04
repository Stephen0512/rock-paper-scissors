"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function OnlinePage() {
    return (
        <main className="absolute inset-0 flex items-center justify-center p-4">
            {/* Background Design */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#2A1B5D] to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 h-full bg-[url('/mountains.svg')] bg-cover bg-bottom opacity-50"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-30"></div>
                <div className="absolute inset-0 bg-[url('/clouds.svg')] bg-cover opacity-20"></div>
            </div>

            {/* Content */}
            <div className="relative text-center space-y-6">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-bold text-white"
                >
                    Coming Soon
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-300"
                >
                    Online multiplayer mode is under development 😭
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link 
                        href="/play"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-[#00C2FF] to-[#7D00FF] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        Back to Game Modes
                    </Link>
                </motion.div>
            </div>
        </main>
    )
} 