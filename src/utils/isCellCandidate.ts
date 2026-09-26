import type { SelectedCell } from "../interfaces/SelectedCell";

function isCellCandidate(
    selectedCell: SelectedCell | null,
    candidates: Map<string, number[]>,
    number: number,
): boolean {
    if (selectedCell === null) return false;
    const key: string = `${selectedCell.row}-${selectedCell.col}`;
    const cellCandidates: number[] = candidates.get(key) ?? [];
    return cellCandidates.includes(number);
}

export default isCellCandidate;
