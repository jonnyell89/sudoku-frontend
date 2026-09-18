import { MAX_VALUE } from "../constants/sudoku";
import type { GuessView } from "../interfaces/GuessView";
import type { SelectedCell } from "../interfaces/SelectedCell";
import resolveGuessStatus from "./resolveGuessStatus";

function buildGuessViews(
    selectedCell: SelectedCell | null,
    selectedGuess: number,
    guessResult: boolean,
    isSolved: boolean,
): GuessView[] {

    const guesses: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);

    return guesses.map((guess) => {
        const isSelectedCell = selectedCell != null;
        const isSelectedGuess = guess === selectedGuess;
        return {
            value: guess,
            active: isSelectedCell,
            selected: isSelectedGuess,
            guess: resolveGuessStatus(isSelectedGuess, selectedGuess, guessResult),
            solved: isSolved,
        }
    })
}

export default buildGuessViews;
