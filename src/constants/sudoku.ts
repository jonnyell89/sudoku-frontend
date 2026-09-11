import type { CellResponse } from "../interfaces/CellResponse";

export const GRID_SIZE = 9;
export const BOX_SIZE = 3;
export const MAX_VALUE = 9;

export const EMPTY_CELLS: CellResponse[][] = 
    Array.from({ length: GRID_SIZE }, () => 
        Array.from({ length: GRID_SIZE }, () => ({ value: 0, given: false }))
);
