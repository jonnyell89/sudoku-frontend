import { useState } from "react";

import { createPuzzle, makeGuess } from "../api/puzzleApi";
import { EMPTY_CELLS } from "../constants/sudoku";
import type { CellResponse } from "../interfaces/CellResponse";
import type { CellView } from "../interfaces/CellView";
import type { GuessRequest } from "../interfaces/GuessRequest";
import type { GuessResponse } from "../interfaces/GuessResponse";
import type { NumberView } from "../interfaces/NumberView";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import type { SelectedCell } from "../interfaces/SelectedCell";
import { buildCellViews } from "../utils/buildCellViews";
import { buildNumberViews } from "../utils/buildNumberViews";
import { cellKey } from "../utils/cellKey";
import { isCellFilled } from "../utils/isCellFilled";
import { toggleCandidate } from "../utils/toggleCandidate";
import { updatePuzzle } from "../utils/updatePuzzle";
import ButtonPanel from "./ButtonPanel";
import DifficultySelector from "./DifficultySelector";
import Grid from "./Grid";
import NumberSelector from "./NumberSelector";

function Sudoku() {

    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [guessResult, setGuessResult] = useState<boolean | null>(null);
    const [candidates, setCandidates] = useState<Map<string, number[]>>(new Map());
    const [candidatesMode, setCandidatesMode] = useState<boolean>(false);
    const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean>(false);

    const isGridEmpty = puzzle === null;

    const resetSelection = () => {
        setSelectedCell(null);
        setSelectedNumber(null);
        setGuessResult(null);
    };

    const handleSelect = (
        row: number,
        col: number,
    ) => {
        if (isGridEmpty || isPuzzleSolved) return;
        const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
        resetSelection();
        if (!isSelectedCell) setSelectedCell({ row, col });
    };

    const handleCandidatesMode = () => setCandidatesMode((prev) => !prev);

    const handleCandidate = (
        candidate: number,
    ) => {
        if (isGridEmpty || !selectedCell || !candidatesMode || isCellFilled(puzzle.cells, selectedCell.row, selectedCell.col)) return;
        const key: string = cellKey(selectedCell.row, selectedCell.col);
        setCandidates((prev) => {
            const next = new Map(prev);
            next.set(key, toggleCandidate(prev.get(key) ?? [], candidate));
            console.log(`row: ${selectedCell.row} col: ${selectedCell.col} candidates: ${next.get(key)}`); // remember to delete
            return next;
        });
    };

    const handleGuess = async (
        guess: number,
    ) => {
        if (isGridEmpty || !selectedCell || guessResult || isPuzzleSolved || isCellFilled(puzzle.cells, selectedCell.row, selectedCell.col)) return;
        setSelectedNumber(guess);
        const guessRequest: GuessRequest = {
            row: selectedCell.row,
            col: selectedCell.col,
            value: guess,
        };
        try {
            const guessResponse: GuessResponse = await makeGuess(puzzle.id, guessRequest);
            if (guessResponse.correct) {
                setPuzzle((prev) => (prev && prev.id === puzzle.id ? updatePuzzle(prev, guessRequest) : prev));
                setCandidates((prev) => {
                    const next = new Map(prev);
                    next.delete(cellKey(guessRequest.row, guessRequest.col));
                    return next;
                });
            }
            if (guessResponse.correct && guessResponse.solved) {
                resetSelection();
                setCandidates(new Map());
                setCandidatesMode(false);
                setIsPuzzleSolved(true);
            } else {
                setGuessResult(guessResponse.correct);
            }
        } catch (error) {
            console.error(`Failed to submit guess: ${error}`);
        }
    };

    const handleNumber = candidatesMode ? handleCandidate : handleGuess;

    const handleDifficulty = async (
        difficulty: string,
    ) => {
        try {
            setPuzzle(await createPuzzle(difficulty));
            resetSelection();
            setCandidates(new Map());
            setCandidatesMode(false);
            setIsPuzzleSolved(false);
        } catch (error) {
            console.error(`Failed to fetch puzzle: ${error}`);
        }
    };

    const cells: CellResponse[][] = puzzle ? puzzle.cells : EMPTY_CELLS;

    const cellViews: CellView[][] = buildCellViews(
        cells,
        selectedCell,
        selectedNumber,
        guessResult,
        candidates,
    );

    const numberViews: NumberView[] = buildNumberViews(
        cells,
        selectedCell,
        selectedNumber,
        guessResult,
        candidates,
        candidatesMode,
    );

    return (
        <div className="sudoku">
            <DifficultySelector
                onDifficulty={handleDifficulty}
            />
            <Grid
                cellViews={cellViews}
                isGridEmpty={isGridEmpty}
                isPuzzleSolved={isPuzzleSolved}
                onSelect={handleSelect}
            />
            <NumberSelector
                numberViews={numberViews}
                onNumber={handleNumber}
            />
            <ButtonPanel
                candidatesMode={candidatesMode}
                onToggle={handleCandidatesMode}
            />
        </div>
    );
}

export default Sudoku;
