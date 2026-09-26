import type { CellResponse } from "../interfaces/CellResponse";
import type { CellView } from "../interfaces/CellView";
import type { SelectedCell } from "../interfaces/SelectedCell";
import isHighlighted from "./isHighlighted";
import resolveCandidates from "./resolveCandidates";
import resolveGuessStatus from "./resolveGuessStatus";

function buildCellViews(
    cells: CellResponse[][], 
    selectedCell: SelectedCell | null,
    selectedGuess: number,
    guessResult: boolean,
    candidates: Map<string, number[]>,
): CellView[][] {

    return cells.map((rows, row) => (
        rows.map((cell, col) => {
            const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
            return {
                value: cell.value,
                given: cell.given,
                selected: isSelectedCell,
                highlighted: isHighlighted(row, col, selectedCell),
                guessStatus: resolveGuessStatus(isSelectedCell, selectedGuess, guessResult),
                candidates: resolveCandidates(row, col, candidates)
            }
        })
    ))
}

export default buildCellViews;
