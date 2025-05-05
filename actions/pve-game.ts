'use server';

import { auth } from '@/lib/auth';
import { db } from '@/database/db';
import { rpsGame } from '@/database/schema/rps_game';
import { getWinner, Move } from '@/lib/game';
import { eq, desc } from 'drizzle-orm';
import { headers } from 'next/headers';

export type GameResult = "win" | "lose" | "draw";
export type GameState = {
    playerMove: Move | null;
    opponentMove: Move | null;
    result: GameResult | null;
    score: {
        player: number;
        ai: number;
    };
};

export type GameHistory = {
    id: string;
    playerId: string;
    opponent: string;
    playerMove: Move;
    opponentMove: Move;
    result: GameResult;
    createdAt: Date;
};

export async function playPvEGame(move: Move): Promise<GameState> {
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
        result,
        score: {
            player: result === "win" ? 1 : 0,
            ai: result === "lose" ? 1 : 0
        }
    };
}

export async function getPvEGameHistory(): Promise<GameHistory[]> {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session) throw new Error("Not authenticated");

    const games = await db
        .select()
        .from(rpsGame)
        .where(eq(rpsGame.playerId, session.user.id))
        .orderBy(desc(rpsGame.createdAt));

    return games.map(game => ({
        ...game,
        playerMove: game.playerMove as Move,
        opponentMove: game.opponentMove as Move,
        result: game.result as GameResult,
        createdAt: game.createdAt || new Date()
    }));
} 