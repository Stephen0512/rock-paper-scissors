"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getCurrentGameLeaderboard } from "@/actions/leaderboard"
import type { LeaderboardEntry } from "@/actions/leaderboard"

export default function LeaderboardWidget() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true)
        const data = await getCurrentGameLeaderboard()
        setLeaderboard(data.slice(0, 5)) // Just show top 5
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <motion.div 
      className="absolute top-4 right-4 z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div 
        className={`bg-[#1A1A2E]/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-96' : 'w-56'}`}
      >
        {/* Header */}
        <div 
          className="p-3 bg-gradient-to-r from-[#00C2FF]/20 to-[#7D00FF]/20 flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <h3 className="text-sm font-bold text-white">AI Battle Rankings</h3>
          </div>
          <svg 
            className={`w-5 h-5 text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Content */}
        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-64' : 'max-h-0'}`}>
          {isLoading ? (
            <div className="flex justify-center items-center h-16 p-3">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-4 px-3">
              <p className="text-sm text-white/70">No players yet!</p>
            </div>
          ) : (
            <div className="px-3 py-2">
              <div className="grid grid-cols-12 gap-2 text-xs text-white/50 mb-1 px-2">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Player</div>
                <div className="col-span-2 text-center">W</div>
                <div className="col-span-2 text-center">L</div>
                <div className="col-span-2 text-center">Rate</div>
              </div>
              {leaderboard.map((entry, index) => (
                <div 
                  key={entry.playerId}
                  className="grid grid-cols-12 gap-2 text-sm py-2 px-2 border-t border-white/5"
                >
                  <div className="col-span-1 text-white/70">{index + 1}</div>
                  <div className="col-span-5 font-medium text-white truncate">{entry.playerName}</div>
                  <div className="col-span-2 text-center text-green-400">{entry.wins}</div>
                  <div className="col-span-2 text-center text-red-400">{entry.losses}</div>
                  <div className="col-span-2 text-center text-blue-400">{entry.winRate.toFixed(0)}%</div>
                </div>
              ))}
              <div className="mt-2 mb-3 px-2">
                <Link href="/leaderboard">
                  <button className="w-full text-xs bg-white/10 hover:bg-white/20 text-white rounded-md py-1 px-2 transition-colors">
                    View Full Leaderboard
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Minimized View */}
        {!isExpanded && leaderboard.length > 0 && (
          <div className="px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#7D00FF] flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <span className="text-white text-sm font-medium truncate max-w-24">
                {leaderboard[0]?.playerName}
              </span>
            </div>
            <div className="text-white/70 text-sm">
              {leaderboard[0]?.wins}W - {leaderboard[0]?.losses}L
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
} 