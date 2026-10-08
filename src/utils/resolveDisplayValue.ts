import type { GuessStatus } from "./resolveGuessStatus";

export function resolveDisplayValue(
    value: number,
    guessStatus: GuessStatus,
    selectedNumber: number | null,
): number {
    return guessStatus === "incorrect" && selectedNumber !== null ? selectedNumber : value;
}
