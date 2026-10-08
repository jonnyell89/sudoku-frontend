import type { CellResponse } from "../interfaces/CellResponse";
import type { CellView } from "../interfaces/CellView";
import type { SelectedCell } from "../interfaces/SelectedCell";
import { getCellCandidates } from "./getCellCandidates";
import { isUnitHighlighted } from "./isUnitHighlighted";
import { resolveDisplayValue } from "./resolveDisplayValue";
import { resolveGuessStatus } from "./resolveGuessStatus";

export function buildCellViews(
    cells: CellResponse[][],
    selectedCell: SelectedCell | null,
    selectedNumber: number | null,
    guessResult: boolean | null,
    candidates: Map<string, number[]>,
): CellView[][] {
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
