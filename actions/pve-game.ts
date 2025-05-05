'use server';

import { auth } from '@/lib/auth';
import { db } from '@/database/db';
import { rpsGame } from '@/database/schema/rps_game';
import { getWinner, Move } from '@/lib/game';
import { eq, desc } from 'drizzle-orm';
import { headers } from 'next/headers';

export type GameResult = "win" | "lose" | "draw";

export async function playPvEGame(move: Move) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) throw new Error("Not authenticated");

  const opponentMove = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)] as Move;
  const gameResult = getWinner(move, opponentMove);
  const result: GameResult = gameResult === "player" ? "win" : gameResult === "opponent" ? "lose" : "draw";

  await db.insert(rpsGame).values({
    playerId: session.user.id,
    opponent: "AI",
    playerMove: move,
    opponentMove,
    result: gameResult,
  });

  return { 
    playerMove: move, 
    opponentMove, 
    result
  };
}

export async function getPvEGameHistory() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) throw new Error("Not authenticated");

  const games = await db
    .select()
    .from(rpsGame)
    .where(eq(rpsGame.playerId, session.user.id))
    .orderBy(desc(rpsGame.createdAt));

  return games;
} 