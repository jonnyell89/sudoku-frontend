export type GuessStatus = "none" | "correct" | "incorrect";

function resolveGuessStatus(
    isSelected: boolean, 
    selectedNumber: number, 
    guessResult: boolean,
): GuessStatus {
    if (!isSelected || selectedNumber === 0) return "none";
    return guessResult ? "correct" : "incorrect";
}

export default resolveGuessStatus;
