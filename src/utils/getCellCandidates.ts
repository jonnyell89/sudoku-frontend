import { cellKey } from "./cellKey";

export function getCellCandidates(
    row: number,
    col: number,
    candidates: Map<string, number[]>,
): number[] {
    return candidates.get(cellKey(row, col)) ?? [];
}
