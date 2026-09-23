import { useState } from "react";

import { createPuzzle, makeGuess } from "../api/puzzleApi";
import { EMPTY_CELLS } from "../constants/sudoku";
import type { CellResponse } from "../interfaces/CellResponse";
import type { CellView } from "../interfaces/CellView";
import type { GuessRequest } from "../interfaces/GuessRequest";
import type { GuessResponse } from "../interfaces/GuessResponse";
import type { GuessView } from "../interfaces/GuessView";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import type { SelectedCell } from "../interfaces/SelectedCell";
import buildCellViews from "../utils/buildCellViews";
import buildGuessViews from "../utils/buildGuessViews";
import updatePuzzle from "../utils/updatePuzzle";
import DifficultySelector from "./DifficultySelector";
import Grid from "./Grid";
import GuessSelector from "./GuessSelector";
import Panel from "./Panel";

function Sudoku() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [selectedGuess, setSelectedGuess] = useState<number>(0);
    const [guessResult, setGuessResult] = useState<boolean>(false);
    // const [candidates, setCandidates] = useState<Map<string, number[]>>(new Map());
    const [candidatesMode, setCandidatesMode] = useState<boolean>(false);
    const [isSolved, setIsSolved] = useState<boolean>(false);

    const handleSelect = (row: number, col: number) => {
        if (puzzle === null || isSolved) return;
        if (selectedCell?.row === row && selectedCell?.col === col) {
            setSelectedCell(null);
            setSelectedGuess(0);
            setGuessResult(false);
            return;
        }
        setSelectedCell({ row, col });
        setSelectedGuess(0);
        setGuessResult(false);
    }

    const handleGuess = async (guess: number) => {
        if (puzzle === null || !selectedCell || guessResult || isSolved) return;
        setSelectedGuess(guess);
        const guessRequest: GuessRequest = {
            row: selectedCell.row,
            col: selectedCell.col,
            value: guess,
        };
        try {
            const guessResponse: GuessResponse = await makeGuess(puzzle.id, guessRequest);
            if (guessResponse.correct) {
                setPuzzle((prev) => (prev && prev.id === puzzle.id ? updatePuzzle(prev, guessRequest) : prev));
            }
            if (guessResponse.correct && guessResponse.solved) {
                setSelectedCell(null);
                setSelectedGuess(0);
                setGuessResult(false);
                setIsSolved(true);
            }
            setGuessResult(guessResponse.correct);
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

    const handleToggle = () => setCandidatesMode((prev) => !prev);

    const cells: CellResponse[][] = puzzle ? puzzle.cells : EMPTY_CELLS;

    const cellViews: CellView[][] = buildCellViews(cells, selectedCell, selectedGuess, guessResult);

    const guessViews: GuessView[] = buildGuessViews(selectedCell, selectedGuess, guessResult);

    return (
        <div className="sudoku">
            <Grid
                cellViews={cellViews}
                isEmpty={puzzle === null}
                isSolved={isSolved}
                onSelect={handleSelect}
            />
            <GuessSelector
                guessViews={guessViews}
                onGuess={handleGuess}
            />
            <DifficultySelector
                onDifficulty={handleDifficulty}
            />
            <Panel
                candidatesMode={candidatesMode}
                onToggle={handleToggle}
            />
        </div>
    )
}

export default Sudoku;
