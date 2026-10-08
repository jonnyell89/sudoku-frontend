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
    return cells.map((rows, row) => (
        rows.map((cell, col) => {
            const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
            const isValueHighlighted = !isSelectedCell && selectedCellValue !== 0 && cell.value === selectedCellValue;
            const guessStatus = resolveGuessStatus(isSelectedCell, selectedNumber, guessResult);
            return {
                value: resolveDisplayValue(cell.value, guessStatus, selectedNumber),
                given: cell.given,
                selected: isSelectedCell,
                highlightedValue: isValueHighlighted,
                highlightedUnit: isUnitHighlighted(row, col, selectedCell),
                guessStatus: guessStatus,
                candidates: getCellCandidates(row, col, candidates),
            };
        })
    ));
}
