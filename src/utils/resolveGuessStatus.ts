export type GuessStatus = "none" | "correct" | "incorrect";

export function resolveGuessStatus(
    isSelected: boolean,
    selectedNumber: number,
    guessResult: boolean,
): GuessStatus {
    if (!isSelected || selectedNumber === 0) return "none";
    return guessResult ? "correct" : "incorrect";
}
