import type { SelectedCell } from "../interfaces/SelectedCell";
import getCellCandidates from "./getCellCandidates";

function isCellCandidate(
    selectedCell: SelectedCell | null,
    candidates: Map<string, number[]>,
    number: number,
): boolean {
    if (selectedCell === null) return false;
    return getCellCandidates(selectedCell.row, selectedCell.col, candidates).includes(number);
}

export default isCellCandidate;
