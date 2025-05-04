declare module "@/actions/leaderboard" {
  export type LeaderboardEntry = {
    playerId: string;
    playerName: string;
    wins: number;
    losses: number;
    draws: number;
    totalGames: number;
    winRate: number;
    rank?: number; 
  };

  export function getLeaderboard(): Promise<LeaderboardEntry[]>;
  export function getCurrentGameLeaderboard(): Promise<LeaderboardEntry[]>;
  export function getCurrentUserRanking(): Promise<LeaderboardEntry | null>;
} 