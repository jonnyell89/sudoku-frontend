import type { CellView } from "../interfaces/CellView";
import type { CellViewParams } from "../interfaces/CellViewParams";
import { getCellCandidates } from "./getCellCandidates";
import { isUnitHighlighted } from "./isUnitHighlighted";
import { resolveDisplayValue } from "./resolveDisplayValue";
import { resolveGuessStatus } from "./resolveGuessStatus";

export function buildCellViews({
    cells,
    selectedCell,
    selectedNumber,
    guessResult,
    candidates,
}: CellViewParams): CellView[][] {
    const selectedCellValue: number = selectedCell ? cells[selectedCell.row][selectedCell.col].value : 0;
    const isGuessCorrect: boolean = selectedCell !== null && selectedNumber !== null && guessResult === true;
    return cells.map((rows, row) => (
        rows.map((cell, col) => {
            const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
            const guessStatus = resolveGuessStatus(isSelectedCell, selectedNumber, guessResult);
            const highlightUnit = isUnitHighlighted(row, col, selectedCell);
            const highlightSameValue = !isSelectedCell && selectedCellValue !== 0 && cell.value === selectedCellValue;
            const highlightSameIncorrectValue = !isGuessCorrect && highlightUnit && cell.value === selectedNumber;
            return {
                value: resolveDisplayValue(cell.value, guessStatus, selectedNumber),
                given: cell.given,
                selected: isSelectedCell,
                guessStatus: guessStatus,
                candidates: getCellCandidates(row, col, candidates),
                highlightUnit: highlightUnit,
                highlightSameValue: highlightSameValue,
                highlightSameIncorrectValue: highlightSameIncorrectValue,
            };
        })
    ));
}
