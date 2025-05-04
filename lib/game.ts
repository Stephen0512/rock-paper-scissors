export type Move = "rock" | "paper" | "scissors";

export function getWinner(p1: Move, p2: Move): "player" | "opponent" | "draw" {
    if (p1 === p2) return "draw";
    if (
        (p1 === "rock" && p2 === "scissors") ||
        (p1 === "scissors" && p2 === "paper") ||
        (p1 === "paper" && p2 === "rock")
    ) return "player";
    return "opponent";
}