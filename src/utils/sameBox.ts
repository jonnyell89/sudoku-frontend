import { BOX_SIZE } from "../constants/sudoku";

function sameBox(rowA: number, colA: number, rowB: number, colB: number): boolean {
    return Math.floor(rowA / BOX_SIZE) === Math.floor(rowB / BOX_SIZE)
        && Math.floor(colA / BOX_SIZE) === Math.floor(colB / BOX_SIZE);
}

export default sameBox;
