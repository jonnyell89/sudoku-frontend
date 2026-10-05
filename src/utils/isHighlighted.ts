import type { SelectedCell } from "../interfaces/SelectedCell";
import { isBoxEqual } from "./isBoxEqual";

export function isHighlighted(
    row: number,
    col: number,
    selectedCell: SelectedCell | null,
): boolean {
    if (selectedCell === null) return false;
    if (row === selectedCell.row && col === selectedCell.col) return false;
    return row === selectedCell.row
        || col === selectedCell.col
        || isBoxEqual(row, col, selectedCell.row, selectedCell.col);
}
