import { useState } from "react";
import { MAX_VALUE } from "../constants/sudoku";
import type { SelectedCell } from "../interfaces/SelectedCell";

interface GuessSelectorProps {
    selectedCell: SelectedCell | null;
    onGuess: (guess: number) => void;
}

function GuessSelector({ selectedCell, onGuess }: GuessSelectorProps) {

    const [selectedGuess, setSelectedGuess] = useState<number | null>(null);

    const guesses: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);

    const handleClick = (guess: number) => {
        if (selectedCell) {
            setSelectedGuess(guess);
            onGuess(guess);
        }
    };

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
                        onClick={() => handleClick(guess)}
                    >
                        {guess}
                    </div>
                )
            })}
        </div>
    )
}

export default GuessSelector;
