"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getCurrentUserRanking } from "@/actions/leaderboard"
import type { LeaderboardEntry } from "@/actions/leaderboard"

export default function CurrentUserRanking({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [userRanking, setUserRanking] = useState<LeaderboardEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setIsLoading(true)
        const data = await getCurrentUserRanking()
        setUserRanking(data)
      } catch (error) {
        console.error("Error fetching user ranking:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRanking()
  }, [refreshTrigger]) // Refresh whenever the trigger value changes

  if (isLoading) {
    return (
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-[#1A1A2E]/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 w-80 flex justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (!userRanking) {
    return null
  }

  // For new players with no rank yet
  if (userRanking.rank === 0) {
    return (
      <motion.div 
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-[#1A1A2E]/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 w-80 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-white/70 text-sm">Play your first game to get ranked!</p>
      </motion.div>
    )
  }

  const rank = userRanking.rank || 0;

  return (
    <motion.div 
      className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-[#1A1A2E]/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/10 w-80"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00C2FF] to-[#7D00FF] flex items-center justify-center text-white font-bold text-lg">
              {rank}
            </div>
            {rank <= 3 && (
              <div className="absolute -top-2 -right-2">
                <span className="text-xl">
                  {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="text-white font-medium">Your Current Rank</p>
            <p className="text-white/60 text-xs">Among all AI battle players</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-white/70 text-xs">Win Rate</p>
          <p className={`font-bold text-lg ${
            userRanking.winRate >= 70 ? 'text-green-400' : 
            userRanking.winRate >= 50 ? 'text-blue-400' : 
            userRanking.winRate >= 30 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {userRanking.winRate.toFixed(1)}%
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-center">
        <div>
          <p className="text-white/70 text-xs">Wins</p>
          <p className="text-green-400 font-medium">{userRanking.wins}</p>
        </div>
        <div>
          <p className="text-white/70 text-xs">Losses</p>
          <p className="text-red-400 font-medium">{userRanking.losses}</p>
        </div>
        <div>
          <p className="text-white/70 text-xs">Draws</p>
          <p className="text-yellow-400 font-medium">{userRanking.draws}</p>
        </div>
      </div>
    </motion.div>
  )
} 