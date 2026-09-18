export type GuessStatus = "none" | "correct" | "incorrect";

function resolveGuessStatus(
    isSelected: boolean, 
    selectedGuess: number, 
    guessResult: boolean
): GuessStatus {
    if (!isSelected || selectedGuess === 0) return "none";
    return guessResult ? "correct" : "incorrect";
}

export default resolveGuessStatus;
