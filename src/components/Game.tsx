import { useState } from "react";

import { createPuzzle, makeGuess } from "../api/puzzleApi";
import { EMPTY_CELLS } from "../constants/sudoku";
import type { GuessRequest } from "../interfaces/GuessRequest";
import type { GuessResponse } from "../interfaces/GuessResponse";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import type { SelectedCell } from "../interfaces/SelectedCell";
import updatePuzzle from "../utils/updatePuzzle";
import DifficultySelector from "./DifficultySelector";
import Grid from "./Grid";
import GuessSelector from "./GuessSelector";

function Game() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [selectedGuess, setSelectedGuess] = useState<number | null>(null);

    const handleDifficulty = async (difficulty: string) => {
        try {
            setPuzzle(await createPuzzle(difficulty));
        } catch (error) {
            console.error(`Failed to fetch puzzle: ${error}`);
        }
    }

    const handleGuess = async (guess: number) => {
        if (puzzle === null || !selectedCell) return;
        const guessRequest: GuessRequest = {
            row: selectedCell?.row,
            col: selectedCell?.col,
            value: guess,
        };
        try {
            const guessResponse: GuessResponse = await makeGuess(puzzle.id, guessRequest);
            if (guessResponse.correct) {
                setPuzzle((prev) => (prev ? updatePuzzle(prev, guessRequest) : prev));
                setSelectedCell(null);
                setSelectedGuess(null);
            } else {
                setSelectedGuess(guess);
            }
        } catch (error) {
            console.error(`Failed to submit guess: ${error}`);
        }
    }

    const cells = puzzle ? puzzle.cells : EMPTY_CELLS;

    return (
        <div className="game">
            <Grid
                cells={cells}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
                setSelectedGuess={setSelectedGuess}
            />
            <GuessSelector
                selectedCell={selectedCell}
                selectedGuess={selectedGuess}
                onGuess={handleGuess}
            />
            <DifficultySelector
                onDifficulty={handleDifficulty}
            />
        </div>
    )
}

export default Game;
