import { useState } from "react";

import { createPuzzle, makeGuess } from "../api/puzzleApi";
import { EMPTY_CELLS } from "../constants/sudoku";
import type { CellResponse } from "../interfaces/CellResponse";
import type { CellView } from "../interfaces/CellView";
import type { GuessRequest } from "../interfaces/GuessRequest";
import type { GuessResponse } from "../interfaces/GuessResponse";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import type { SelectedCell } from "../interfaces/SelectedCell";
import buildCellViews from "../utils/buildCellViews";
import updatePuzzle from "../utils/updatePuzzle";
import DifficultySelector from "./DifficultySelector";
import Grid from "./Grid";
import GuessSelector from "./GuessSelector";

function Sudoku() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [selectedGuess, setSelectedGuess] = useState<number>(0);
    const [guessResult, setGuessResult] = useState<boolean>(false);
    const [isSolved, setIsSolved] = useState<boolean>(false);

    const handleSelect = (row: number, col: number) => {
        if (isSolved) return;
        setSelectedCell({ row, col });
        setSelectedGuess(0);
        setGuessResult(false);
    }

    const handleGuess = async (guess: number) => {
        if (puzzle === null || !selectedCell || isSolved) return;
        setSelectedGuess(guess);
        const guessRequest: GuessRequest = {
            row: selectedCell.row,
            col: selectedCell.col,
            value: selectedGuess,
        };
        try {
            const guessResponse: GuessResponse = await makeGuess(puzzle.id, guessRequest);
            setGuessResult(guessResponse.correct);
            if (guessResponse.correct) {
                setPuzzle((prev) => (prev ? updatePuzzle(prev, guessRequest) : prev));
            }
            if (guessResponse.correct && guessResponse.solved) {
                setIsSolved(true);
            }
        } catch (error) {
            console.error(`Failed to submit guess: ${error}`);
        }
    }

    const handleDifficulty = async (difficulty: string) => {
        try {
            setPuzzle(await createPuzzle(difficulty));
            setSelectedCell(null);
            setSelectedGuess(0);
            setGuessResult(false);
            setIsSolved(false);
        } catch (error) {
            console.error(`Failed to fetch puzzle: ${error}`);
        }
    }

    const cells: CellResponse[][] = puzzle ? puzzle.cells : EMPTY_CELLS;

    const cellViews: CellView[][] = buildCellViews(cells, selectedCell, guessResult, isSolved);

    return (
        <div className="sudoku">
            <Grid
                cellViews={cellViews}
                onSelect={handleSelect}
            />
            <GuessSelector
                selectedCell={selectedCell}
                selectedGuess={selectedGuess}
                guessResult={guessResult}
                isSolved={isSolved}
                onGuess={handleGuess}
            />
            <DifficultySelector
                onDifficulty={handleDifficulty}
            />
        </div>
    )
}

export default Sudoku;
