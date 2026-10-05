export type GuessStatus = "none" | "correct" | "incorrect";

export function resolveGuessStatus(
    isSelected: boolean,
    selectedNumber: number | null,
    guessResult: boolean | null,
): GuessStatus {
    if (!isSelected || selectedNumber === null || guessResult === null) return "none";
    return guessResult ? "correct" : "incorrect";
}
