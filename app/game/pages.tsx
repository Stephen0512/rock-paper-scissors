import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { rpsGame } from "@/database/schema/rps_game";
import { eq } from "drizzle-orm";

export default async function GamePage() {
  const requestHeaders = headers();
  const session = await auth.api.getSession({ headers: await requestHeaders });

  if (!session) return null;

  const games = await db
    .select()
    .from(rpsGame)
    .where(eq(rpsGame.playerId, session.user.id));

  return (
    <main className="py-8 px-4">
      <section className="container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-6">Rock Paper Scissors</h1>
        <div className="space-x-4 mb-6">
          {["rock", "paper", "scissors"].map((move) => (
            <form
              key={move}
              action="/actions/game/play" // Or wire this to your actual `playGame` action if using useActionState instead
              method="POST"
              className="inline-block"
            >
              <input type="hidden" name="move" value={move} />
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                {move}
              </button>
            </form>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-2">My Game History</h2>
        <div className="mx-auto max-w-lg text-left">
          {games.length === 0 ? (
            <p>No games yet. Play one above!</p>
          ) : (
            <ul className="space-y-2">
              {games.map((game) => (
                <li
                  key={game.id}
                  className="p-2 border rounded flex justify-between items-center"
                >
                  <div>
                    You: <strong>{game.playerMove}</strong> vs AI:{" "}
                    <strong>{game.opponentMove}</strong>
                  </div>
                  <div className="font-bold">
                    {game.result === "player"
                      ? "✅ You Win"
                      : game.result === "opponent"
                      ? "❌ You Lose"
                      : "🤝 Draw"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}