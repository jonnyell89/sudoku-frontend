import { useState } from "react";
import { GRID_SIZE } from "../constants/sudoku";
import type { Cell } from "../interfaces/Cell";
import type { Guess } from "../interfaces/Guess";
import type { GuessRequest } from "../interfaces/GuessRequest";
import type { GuessResponse } from "../interfaces/GuessResponse";
import { makeGuess } from "../api/puzzleApi";

interface GuessSelectorProps {
    id: number;
    selectedCell: Cell | null;
    onCorrectGuess: (correctGuess: Guess) => void;
}

function GuessSelector({ id, selectedCell, onCorrectGuess }: GuessSelectorProps) {

    const [selectedGuess, setSelectedGuess] = useState<number | null>(null);

    const guesses: number[] = Array.from({ length: GRID_SIZE }, (_, index) => index + 1);

    const handleClick = async (guess: number) => {
        if (selectedCell) {
            setSelectedGuess(guess);
            const guessRequest: GuessRequest = { 
                row: selectedCell.row, 
                col: selectedCell.col, 
                value: guess 
            };
            try {
                const guessResponse: GuessResponse = await makeGuess(id, guessRequest);
                if (guessResponse.correct) {
                    onCorrectGuess({ 
                        row: guessRequest.row, 
                        col: guessRequest.col, 
                        value: guessRequest.value 
                    });
                }
            } catch (error) {
                console.error(`Failed to submit guess: ${error}`);
            }
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
