import type { CellResponse } from "../interfaces/CellResponse";
import type { CellView } from "../interfaces/CellView";
import type { SelectedCell } from "../interfaces/SelectedCell";
import { getCellCandidates } from "./getCellCandidates";
import { isHighlighted } from "./isHighlighted";
import { resolveGuessStatus } from "./resolveGuessStatus";

export function buildCellViews(
    isEmpty: boolean,
    cells: CellResponse[][],
    selectedCell: SelectedCell | null,
    selectedGuess: number,
    guessResult: boolean,
    candidates: Map<string, number[]>,
    isSolved: boolean,
): CellView[][] {
    return cells.map((rows, row) => (
        rows.map((cell, col) => {
            const isSelectable = !isEmpty && !isSolved && !cell.given;
            const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
            return {
                value: cell.value,
                given: cell.given,
                selectable: isSelectable,
                selected: isSelectedCell,
                highlighted: isHighlighted(row, col, selectedCell),
                guessStatus: resolveGuessStatus(isSelectedCell, selectedGuess, guessResult),
                candidates: getCellCandidates(row, col, candidates),
            };
        })
    ));
}
