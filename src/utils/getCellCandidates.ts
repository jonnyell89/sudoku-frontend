import cellKey from "./cellKey";

function getCellCandidates(
    row: number, 
    col: number, 
    candidates: Map<string, number[]>
): number[] {
    return candidates.get(cellKey(row, col)) ?? [];
}

export default getCellCandidates;
