"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { playPvPGame, type GameResult } from "@/actions/pvp-game"
import { Move } from "@/lib/game"
import { authClient } from "@/lib/auth-client"

export default function PvPGame() {
    const [player1Choice, setPlayer1Choice] = useState<Move | null>(null)
    const [player2Choice, setPlayer2Choice] = useState<Move | null>(null)
    const [result, setResult] = useState<GameResult | null>(null)
    const [score, setScore] = useState({ player1: 0, player2: 0 })
    const [showAchievement, setShowAchievement] = useState<string | null>(null)
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1)
    const [isProcessing, setIsProcessing] = useState(false)
    const { data: session } = authClient.useSession()
    const [showAuthModal, setShowAuthModal] = useState(false)

    const choices: Move[] = ["rock", "paper", "scissors"]

    useEffect(() => {
        if (showAchievement) {
            const timer = setTimeout(() => {
                setShowAchievement(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showAchievement])

    const handleChoice = async (choice: Move) => {
        if (!session) {
            setShowAuthModal(true)
            return
        }

        if (isProcessing) return

        if (currentPlayer === 1) {
            setPlayer1Choice(choice)
            setCurrentPlayer(2)
        } else {
            try {
                setIsProcessing(true)
                const gameResult = await playPvPGame(player1Choice!, choice)
                setPlayer2Choice(gameResult.player2Move)
                setResult(gameResult.result)
                
                if (gameResult.result === "player1") {
                    setScore(prev => ({ ...prev, player1: prev.player1 + 1 }))
                } else if (gameResult.result === "player2") {
                    setScore(prev => ({ ...prev, player2: prev.player2 + 1 }))
                }
                
                // Reset for next round after 4 seconds
                setTimeout(() => {
                    setPlayer1Choice(null)
                    setPlayer2Choice(null)
                    setResult(null)
                    setCurrentPlayer(1)
                    setIsProcessing(false)
                }, 4000)
            } catch (error) {
                console.error("Error playing game:", error)
                setIsProcessing(false)
            }
        }
    }

    const resetGame = () => {
        setPlayer1Choice(null)
        setPlayer2Choice(null)
        setResult(null)
        setScore({ player1: 0, player2: 0 })
        setCurrentPlayer(1)
        setIsProcessing(false)
    }

    return (
        <main className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* Background Design */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#2A1B5D] to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 h-full bg-[url('/mountains.svg')] bg-cover bg-bottom opacity-50"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-30"></div>
                <div className="absolute inset-0 bg-[url('/clouds.svg')] bg-cover opacity-20"></div>
            </div>

            {/* Game Interface */}
            <div className="relative w-full max-w-4xl mx-4 space-y-8">
                {/* Score Board */}
                <div className="bg-[#1A1A2E]/80 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Score</h2>
                    <div className="flex justify-center gap-8">
                        <div>
                            <p className="text-gray-300">Player 1</p>
                            <p className="text-3xl font-bold text-white">{score.player1}</p>
                        </div>
                        <div>
                            <p className="text-gray-300">Player 2</p>
                            <p className="text-3xl font-bold text-white">{score.player2}</p>
                        </div>
                    </div>
                </div>

                {/* Game Result */}
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#1A1A2E]/80 backdrop-blur-sm rounded-2xl p-6 text-center"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">
                            {result === "player1" ? "Player 1 Wins! 🎉" : 
                             result === "player2" ? "Player 2 Wins! 🎉" : 
                             "It's a Draw! 🤝"}
                        </h3>
                        <div className="flex justify-center gap-8 mt-4">
                            <div>
                                <p className="text-gray-300">Player 1&apos;s Choice</p>
                                <p className="text-xl font-bold text-white capitalize">{player1Choice}</p>
                            </div>
                            <div>
                                <p className="text-gray-300">Player 2&apos;s Choice</p>
                                <p className="text-xl font-bold text-white capitalize">{player2Choice}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Current Player Indicator */}
                <div className="text-center">
                    <p className="text-xl font-bold text-white">
                        {currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn"}
                    </p>
                </div>

                {/* Choice Buttons */}
                <div className="grid grid-cols-3 gap-4">
                    {choices.map((choice) => (
                        <motion.button
                            key={choice}
                            whileHover={!isProcessing ? { scale: 1.05 } : {}}
                            whileTap={!isProcessing ? { scale: 0.95 } : {}}
                            onClick={() => handleChoice(choice)}
                            disabled={isProcessing}
                            className={`bg-[#1A1A2E]/80 backdrop-blur-sm rounded-2xl p-6 border transition-all
                                ${isProcessing 
                                    ? 'border-white/5 opacity-50 cursor-not-allowed' 
                                    : 'border-white/10 hover:border-white/30'}`}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-[#00C2FF] to-[#7D00FF] rounded-xl flex items-center justify-center">
                                    <span className="text-3xl">
                                        {choice === "rock" ? "✊" : choice === "paper" ? "✋" : "✌️"}
                                    </span>
                                </div>
                                <p className="text-white font-bold capitalize">{choice}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetGame}
                        className="px-6 py-2 bg-gradient-to-r from-[#00C2FF] to-[#7D00FF] text-white rounded-xl font-bold hover:opacity-90"
                    >
                        Reset Game
                    </motion.button>
                    <Link href="/play">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20"
                        >
                            Back to Menu
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Achievement Popup */}
            <AnimatePresence>
                {showAchievement && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
                    >
                        <div className="bg-gradient-to-r from-[#00C2FF] to-[#7D00FF] text-white px-8 py-4 rounded-full shadow-lg">
                            <p className="text-xl font-bold">{showAchievement}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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