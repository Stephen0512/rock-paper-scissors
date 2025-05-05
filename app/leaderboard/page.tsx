"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getLeaderboard } from "@/actions/leaderboard"

type LeaderboardEntry = {
  playerId: string
  playerName: string
  wins: number
  losses: number
  draws: number
  totalGames: number
  winRate: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true)
        const data = await getLeaderboard()
        setLeaderboard(data)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <main className="absolute inset-0 flex flex-col items-center p-4">
      {/* Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#2A1B5D] to-transparent">
          <div className="absolute bottom-0 left-0 right-0 h-full bg-[url('/mountains.svg')] bg-cover bg-bottom opacity-50"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/clouds.svg')] bg-cover opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-5xl mx-auto mt-16 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Player vs AI Leaderboard</h1>
            <p className="text-gray-300 mt-2">See who&apos;s dominating in games against our AI!</p>
          </div>
          <Link href="/play">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20"
            >
              Back to Games
            </motion.button>
          </Link>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-[#1A1A2E]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-white/70">No games played yet!</p>
              <p className="text-white/50 mt-2">Be the first to play and get on the leaderboard</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="pb-4 text-white/70 font-semibold">Rank</th>
                    <th className="pb-4 text-white/70 font-semibold">Player</th>
                    <th className="pb-4 text-white/70 font-semibold">Games</th>
                    <th className="pb-4 text-white/70 font-semibold">Wins</th>
                    <th className="pb-4 text-white/70 font-semibold">Losses</th>
                    <th className="pb-4 text-white/70 font-semibold">Draws</th>
                    <th className="pb-4 text-white/70 font-semibold">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr 
                      key={entry.playerId} 
                      className={`border-b border-white/5 ${index < 3 ? 'bg-white/5' : ''}`}
                    >
                      <td className="py-4">
                        <div className="flex items-center">
                          {index === 0 ? (
                            <span className="text-2xl">🥇</span>
                          ) : index === 1 ? (
                            <span className="text-2xl">🥈</span>
                          ) : index === 2 ? (
                            <span className="text-2xl">🥉</span>
                          ) : (
                            <span className="text-white/70 font-bold">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="font-semibold text-white">{entry.playerName}</span>
                      </td>
                      <td className="py-4 text-white/70">{entry.totalGames}</td>
                      <td className="py-4 text-green-400">{entry.wins}</td>
                      <td className="py-4 text-red-400">{entry.losses}</td>
                      <td className="py-4 text-yellow-400">{entry.draws}</td>
                      <td className="py-4">
                        <span 
                          className={`font-semibold ${
                            entry.winRate >= 70 ? 'text-green-400' : 
                            entry.winRate >= 50 ? 'text-blue-400' : 
                            entry.winRate >= 30 ? 'text-yellow-400' : 'text-red-400'
                          }`}
                        >
                          {entry.winRate.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tips Box */}
        <div className="bg-[#1A1A2E]/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">Game Tips</h3>
          <ul className="space-y-2 text-white/70">
            <li>• Play consistently to improve your rank</li>
            <li>• Win streaks are rewarded with special achievements</li>
            <li>• Try to predict the AI&apos;s patterns for better results</li>
            <li>• Challenge yourself to climb the leaderboard and beat your friends&apos; scores</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 