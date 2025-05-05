'use server';

import { auth } from '@/lib/auth';
import { db } from '@/database/db';
import { rpsGame } from '@/database/schema/rps_game';
import { getWinner, Move } from '@/lib/game';
import { headers } from 'next/headers';

export type GameResult = "player1" | "player2" | "draw";

export async function playPvPGame(player1Move: Move, player2Move: Move): Promise<{
    result: GameResult;
    player1Move: Move;
    player2Move: Move;
}> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) throw new Error("Not authenticated");

  const gameResult = getWinner(player1Move, player2Move);
  const result: GameResult = gameResult === "player" ? "player1" : gameResult === "opponent" ? "player2" : "draw";

  await db.insert(rpsGame).values({
    playerId: session.user.id,
    opponent: "Player",
    playerMove: player1Move,
    opponentMove: player2Move,
    result: gameResult,
  });

  return {
    result,
    player1Move,
    player2Move
  };
} 