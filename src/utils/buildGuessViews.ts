import { MAX_VALUE } from "../constants/sudoku";
import type { GuessView } from "../interfaces/GuessView";
import type { SelectedCell } from "../interfaces/SelectedCell";

function buildGuessViews(
    selectedCell: SelectedCell | null,
    selectedGuess: number,
    guessResult: boolean,
    isSolved: boolean,
): GuessView[] {

    const guesses: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);

    return guesses.map((guess) => {
        const active = selectedCell != null;
        const selected = guess === selectedGuess;
        return {
            active: active,
            selected: selected,
            guess: selected && guessResult ? "correct" : "incorrect",
            solved: isSolved,
        }
    })
}
