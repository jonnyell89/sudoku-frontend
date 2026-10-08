import type { CellResponse } from "./CellResponse";
import type { SelectedCell } from "./SelectedCell";

export interface CellViewParams {
    cells: CellResponse[][];
    selectedCell: SelectedCell | null;
    selectedNumber: number | null;
    guessResult: boolean | null;
    candidates: Map<string, number[]>;
}
