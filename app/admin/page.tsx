import { auth } from "@/lib/auth";
import { resetGames } from "@/actions/game";

export default async function AdminPage() {
    const session = await auth();
    if (!session || session.user.role !== "admin") return null;

    return (
        <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <form action={resetGames}>
            <button className="bg-red-600 text-white px-4 py-2 rounded">
                Reset All Game Records
            </button>
        </form>
        </main>
    );
}