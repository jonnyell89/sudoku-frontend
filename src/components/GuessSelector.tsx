import { useState } from "react";
import { GRID_SIZE } from "../constants/sudoku";
import type { Cell } from "../interfaces/Cell";

interface GuessSelectorProps {
    selectedCell: Cell | null;
}

function GuessSelector({ selectedCell }: GuessSelectorProps) {

    const [selectedGuess, setSelectedGuess] = useState<number | null>(null);

    const guesses: number[] = Array.from({ length: GRID_SIZE }, (_, index) => index + 1);

    const handleClick = (guess: number) => {
        if (selectedCell) {
            setSelectedGuess(guess);
            // makeGuess call to API
        }
    }

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
                        className={className}
                        key={guess}
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
