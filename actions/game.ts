'use server';

import { auth } from '@/lib/auth';
import { db } from '@/database/db';
import { headers } from "next/headers"
import { rpsGame } from '@/database/schema/rps_game';
import { getWinner, Move } from '@/lib/game';
import { eq } from 'drizzle-orm';

export async function playGame(_: any, formData: FormData) {
  // Get session using Better Auth
  const requestHeaders = headers();
  const session = await auth.api.getSession({
    headers: await requestHeaders,
  });

  // Check if session is valid
  if (!session) throw new Error("Not authenticated");

  const move = formData.get("move") as Move;
  const opponentMove = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)] as Move;
  const result = getWinner(move, opponentMove);

  await db.insert(rpsGame).values({
    playerId: session.user.id,
    opponent: "AI",
    playerMove: move,
    opponentMove,
    result,
  });

  return { move, opponentMove, result };
}

export async function resetGames() {
  // Get session using Better Auth
  const requestHeaders = headers();
  const session = await auth.api.getSession({
    headers: await requestHeaders,
  });

  // Check if session is valid
  if (!session) throw new Error("Not authenticated");

  await db.delete(rpsGame).where(eq(rpsGame.opponent, "AI"));
}