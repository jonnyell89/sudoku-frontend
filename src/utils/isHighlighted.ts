import type { SelectedCell } from "../interfaces/SelectedCell";
import sameBox from "./sameBox";

function isHighlighted(row: number, col: number, selectedCell: SelectedCell | null): boolean {
    if (selectedCell === null) return false;
    return row === selectedCell.row 
        || col === selectedCell.col
        || sameBox(row, col, selectedCell.row, selectedCell.col);
}

export default isHighlighted;
