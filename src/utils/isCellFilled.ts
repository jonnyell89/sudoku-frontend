import type { CellResponse } from "../interfaces/CellResponse";

export function isCellFilled(
    cells: CellResponse[][],
    row: number,
    col: number,
): boolean {
    return cells[row][col].value !== 0;
}
