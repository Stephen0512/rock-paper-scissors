'use server';

import { auth } from '@/lib/auth';
import { db } from '@/database/db';
import { rpsGame } from '@/database/schema/rps_game';
import { sql } from 'drizzle-orm';
import { users } from '@/database/schema/auth';
import { headers } from 'next/headers';

export type LeaderboardEntry = {
  playerId: string;
  playerName: string;
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  winRate: number;
  rank?: number; // Optional rank field
};

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    // Get raw data about game stats for each player
    const results = await db.execute(sql`
      WITH player_stats AS (
        SELECT 
          rps_game.player_id,
          COUNT(*) as total_games,
          SUM(CASE WHEN rps_game.result = 'player' THEN 1 ELSE 0 END) as wins,
          SUM(CASE WHEN rps_game.result = 'opponent' THEN 1 ELSE 0 END) as losses,
          SUM(CASE WHEN rps_game.result = 'draw' THEN 1 ELSE 0 END) as draws
        FROM ${rpsGame}
        WHERE rps_game.opponent = 'AI'
        GROUP BY rps_game.player_id
      )
      SELECT 
        player_id,
        total_games,
        wins,
        losses,
        draws,
        CASE 
          WHEN total_games > 0 THEN (wins::float / total_games::float) * 100
          ELSE 0
        END as win_rate
      FROM player_stats
      ORDER BY win_rate DESC, total_games DESC
    `);

    // Get all users to map IDs to names
    const usersList = await db.select().from(users);
    const userMap = new Map(usersList.map((u: { id: string, name: string | null }) => [u.id, u.name || 'Anonymous']));
    
    // Transform the results into the proper format
    const rows = results.rows as Array<{
      player_id: string;
      total_games: string;
      wins: string;
      losses: string;
      draws: string;
      win_rate: string;
    }>;
    
    const leaderboard: LeaderboardEntry[] = rows.map((row, index) => {
      const totalGames = parseInt(row.total_games);
      const wins = parseInt(row.wins);
      const winRate = parseFloat(row.win_rate);
      
      return {
        playerId: row.player_id,
        playerName: userMap.get(row.player_id) || 'Unknown',
        wins: wins,
        losses: parseInt(row.losses),
        draws: parseInt(row.draws),
        totalGames: totalGames,
        winRate: winRate,
        rank: index + 1 // Add ranking
      };
    });

    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export async function getCurrentGameLeaderboard(): Promise<LeaderboardEntry[]> {
  // For now, we'll return the same global leaderboard
  // In a real application, this might fetch data for the current game session only
  return getLeaderboard();
}

export async function getCurrentUserRanking(): Promise<LeaderboardEntry | null> {
  try {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session) return null;

    const allPlayers = await getLeaderboard();
    const currentPlayer = allPlayers.find(player => player.playerId === session.user.id);
    
    if (!currentPlayer) {
      // If user has no games yet, return a default entry with rank 0
      return {
        playerId: session.user.id,
        playerName: session.user.name || 'Anonymous',
        wins: 0,
        losses: 0,
        draws: 0,
        totalGames: 0,
        winRate: 0,
        rank: 0
      };
    }
    
    return currentPlayer;
  } catch (error) {
    console.error('Error fetching current user ranking:', error);
    return null;
  }
} 