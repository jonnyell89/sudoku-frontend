import { MAX_VALUE } from "../constants/sudoku";
import type { NumberView } from "../interfaces/NumberView";
import type { SelectedCell } from "../interfaces/SelectedCell";
import isCellCandidate from "./isCellCandidate";
import resolveGuessStatus from "./resolveGuessStatus";
import resolveNumberStatus from "./resolveNumberStatus";

function buildNumberViews(
    selectedCell: SelectedCell | null,
    selectedNumber: number,
    guessResult: boolean,
    candidates: Map<string, number[]>,
    candidatesMode: boolean,
): NumberView[] {

    const numbers: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);

    return numbers.map((number) => {
        const isActive = selectedCell !== null;
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
        }
    })
}

export default buildNumberViews;
