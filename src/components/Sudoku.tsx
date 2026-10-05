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
    const [isSolved, setIsSolved] = useState<boolean>(false);

    const isEmpty = puzzle === null;

    const handleSelect = (
        row: number,
        col: number,
    ) => {
        if (isEmpty || isSolved) return;
        if (selectedCell?.row === row && selectedCell?.col === col) {
            setSelectedCell(null);
            setSelectedNumber(null);
            setGuessResult(null);
            return;
        }
        setSelectedCell({ row, col });
        setSelectedNumber(null);
        setGuessResult(null);
    };

    const handleCandidatesMode = () => setCandidatesMode((prev) => !prev);

    const handleCandidate = (
        candidate: number,
    ) => {
        if (isEmpty || !selectedCell || !candidatesMode) return;
        const key: string = cellKey(selectedCell.row, selectedCell.col);
        setCandidates((prev) => {
            const next = new Map(prev);
            next.set(key, toggleCandidate(prev.get(key) ?? [], candidate));
            return next;
        });
    };

    const handleGuess = async (
        guess: number,
    ) => {
        if (isEmpty || !selectedCell || guessResult || isSolved) return;
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
            }
            if (guessResponse.correct && guessResponse.solved) {
                setSelectedCell(null);
                setSelectedNumber(null);
                setGuessResult(null);
                setCandidates(new Map());
                setCandidatesMode(false);
                setIsSolved(true);
            }
            setGuessResult(guessResponse.correct);
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
            setSelectedCell(null);
            setSelectedNumber(null);
            setGuessResult(null);
            setCandidates(new Map());
            setCandidatesMode(false);
            setIsSolved(false);
        } catch (error) {
            console.error(`Failed to fetch puzzle: ${error}`);
        }
    };

    const cells: CellResponse[][] = puzzle ? puzzle.cells : EMPTY_CELLS;

    const cellViews: CellView[][] = buildCellViews(
        isEmpty,
        cells,
        selectedCell,
        selectedNumber,
        guessResult,
        candidates,
        isSolved,
    );

    const numberViews: NumberView[] = buildNumberViews(
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
                isEmpty={isEmpty}
                isSolved={isSolved}
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
