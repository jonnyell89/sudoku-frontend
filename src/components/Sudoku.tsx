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

function Sudoku() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [selectedGuess, setSelectedGuess] = useState<number | null>(null);
    const [isGuessCorrect, setIsGuessCorrect] = useState<boolean | null>(null);

    const handleSelect = (row: number, col: number) => {
        setSelectedCell({ row, col });
        setSelectedGuess(null);
        setIsGuessCorrect(null);
    }

    const handleGuess = async (guess: number) => {
        if (puzzle === null || !selectedCell) return;
        const guessRequest: GuessRequest = {
            row: selectedCell.row,
            col: selectedCell.col,
            value: guess,
        };
        try {
            const guessResponse: GuessResponse = await makeGuess(puzzle.id, guessRequest);
            if (guessResponse.correct) {
                setPuzzle((prev) => (prev ? updatePuzzle(prev, guessRequest) : prev));
            }
            setSelectedGuess(guess);
            setIsGuessCorrect(guessResponse.correct);
        } catch (error) {
            console.error(`Failed to submit guess: ${error}`);
        }
    }

    const handleDifficulty = async (difficulty: string) => {
        try {
            setPuzzle(await createPuzzle(difficulty));
            setSelectedCell(null);
            setSelectedGuess(null);
            setIsGuessCorrect(null);
        } catch (error) {
            console.error(`Failed to fetch puzzle: ${error}`);
        }
    }

    const cells = puzzle ? puzzle.cells : EMPTY_CELLS;

    return (
        <div className="sudoku">
            <Grid
                cells={cells}
                selectedCell={selectedCell}
                isGuessCorrect={isGuessCorrect}
                onSelect={handleSelect}
            />
            <GuessSelector
                selectedCell={selectedCell}
                selectedGuess={selectedGuess}
                isGuessCorrect={isGuessCorrect}
                onGuess={handleGuess}
            />
            <DifficultySelector
                onDifficulty={handleDifficulty}
            />
        </div>
    )
}

export default Sudoku;
