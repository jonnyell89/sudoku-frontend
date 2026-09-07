import { BOX_SIZE, GRID_SIZE } from "../constants/sudoku";

function gridToBoxGridMapper(grid: number[][]): number[][] {
    const boxGrid: number[][] = [...Array(GRID_SIZE)].map(() => Array(GRID_SIZE).fill(0));
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const boxRow: number = Math.floor((col / BOX_SIZE)) + (Math.floor((row / BOX_SIZE)) * BOX_SIZE);
            const boxCol: number = (row % BOX_SIZE) * BOX_SIZE + (col % BOX_SIZE);
            boxGrid[boxRow][boxCol] = grid[row][col];
        }
    }
    return boxGrid;
}
