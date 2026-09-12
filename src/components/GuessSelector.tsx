import { MAX_VALUE } from "../constants/sudoku";
import type { SelectedCell } from "../interfaces/SelectedCell";

interface GuessSelectorProps {
    selectedCell: SelectedCell | null;
    selectedGuess: number | null;
    onGuess: (guess: number) => void;
}

function GuessSelector({ selectedCell, selectedGuess, onGuess }: GuessSelectorProps) {

    const guesses: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);

    return(
        <div className="guess-selector">
            {guesses.map((guess) => {
                const isSelectedGuess = guess === selectedGuess;
                const className = [
                    "guess",
                    selectedCell ? "active" : "",
                    isSelectedGuess ? "selected-guess" : "",
                ].filter(Boolean).join(" ");
                return (
                    <div
                        key={guess}
                        className={className}
                        onClick={() => onGuess(guess)}
                    >
                        {guess}
                    </div>
                )
            })}
        </div>
    )
}

export default GuessSelector;
