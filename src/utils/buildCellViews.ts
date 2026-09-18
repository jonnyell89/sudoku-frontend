import type { CellResponse } from "../interfaces/CellResponse";
import type { CellView } from "../interfaces/CellView";
import type { SelectedCell } from "../interfaces/SelectedCell";
import resolveGuessStatus from "./resolveGuessStatus";

function buildCellViews(
    cells: CellResponse[][], 
    selectedCell: SelectedCell | null,
    selectedGuess: number,
    guessResult: boolean,
    isSolved: boolean,
): CellView[][] {
    return cells.map((rows, row) => (
        rows.map((cell, col) => {
            const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
            const boxRight = col === 2 || col === 5; // refers to box styling
            const boxBottom = row === 2 || row === 5; // refers to box styling
            return {
                value: cell.value,
                given: cell.given,
                selected: isSelectedCell,
                guess: resolveGuessStatus(isSelectedCell, selectedGuess, guessResult),
                solved: isSolved,
                boxRight: boxRight,
                boxBottom: boxBottom,
            }
        })
    ))
}

export default buildCellViews;
