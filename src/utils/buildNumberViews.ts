import { MAX_VALUE } from "../constants/sudoku";
import type { NumberView } from "../interfaces/NumberView";
import type { NumberViewParams } from "../interfaces/NumberViewParams";
import { isCellCandidate } from "./isCellCandidate";
import { isCellFilled } from "./isCellFilled";
import { resolveGuessStatus } from "./resolveGuessStatus";
import { resolveNumberStatus } from "./resolveNumberStatus";

export function buildNumberViews({
    cells,
    selectedCell,
    selectedNumber,
    guessResult,
    candidates,
    candidatesMode,
}: NumberViewParams): NumberView[] {
    const numbers: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);
    const isActive = selectedCell !== null && !isCellFilled(cells, selectedCell.row, selectedCell.col);
    return numbers.map((number) => {
        const isSelectedNumber = number === selectedNumber;
        const numberStatus = resolveNumberStatus(candidatesMode);
        const guessStatus = resolveGuessStatus(isSelectedNumber, selectedNumber, guessResult);
        const isCandidate = isCellCandidate(selectedCell, candidates, number);
        return {
            value: number,
            active: isActive,
            selected: isSelectedNumber,
            numberStatus: numberStatus,
            guessStatus: guessStatus,
            candidate: isCandidate,
        };
    });
}
