import { MAX_VALUE } from "../constants/sudoku";
import type { GuessView } from "../interfaces/GuessView";
import type { SelectedCell } from "../interfaces/SelectedCell";
import resolveGuessStatus from "./resolveGuessStatus";

function buildGuessViews(
    selectedCell: SelectedCell | null,
    selectedGuess: number,
    guessResult: boolean,
): GuessView[] {

    const guesses: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);

    return guesses.map((guess) => {
        const isSelectedCell = selectedCell != null;
        const isSelectedGuess = guess === selectedGuess;
        return {
            value: guess,
            active: isSelectedCell && !guessResult,
            selected: isSelectedGuess,
            guessStatus: resolveGuessStatus(isSelectedGuess, selectedGuess, guessResult),
        }
    })
}

export default buildGuessViews;
