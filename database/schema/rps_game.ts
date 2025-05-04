import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const rpsGame = pgTable("rps_game", {
    id: uuid("id").defaultRandom().primaryKey(),
    playerId: text("player_id").notNull(),
    opponent: text("opponent").notNull(),
    playerMove: text("player_move").notNull(),
    opponentMove: text("opponent_move").notNull(),
    result: text("result").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});