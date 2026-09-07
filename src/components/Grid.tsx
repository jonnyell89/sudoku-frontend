import { useState } from "react";
// import { GRID_SIZE } from "../constants/sudoku";

function Grid() {

    const EASY_GRID: number[][] = [
        [4, 1, 0, 0, 6, 0, 0, 7, 0],
        [0, 0, 3, 0, 8, 5, 0, 0, 9],
        [0, 2, 0, 3, 7, 0, 5, 0, 1],
        [0, 3, 0, 6, 0, 9, 2, 5, 0],
        [6, 0, 0, 5, 0, 1, 0, 0, 0],
        [0, 0, 9, 0, 2, 0, 0, 0, 3],
        [0, 0, 6, 2, 0, 0, 7, 4, 5],
        [0, 0, 0, 4, 0, 6, 8, 0, 0],
        [2, 8, 4, 0, 0, 0, 1, 9, 6],
    ];

    const [puzzle] = useState(EASY_GRID);

    // const indices = Array.from({ length: GRID_SIZE }, (_, index) => index);

    return (
        <div className="grid">
            {puzzle.map((rows, row) => (
                rows.map((value, col) => (
                    <div className="cell" key={`${row}-${col}`}>
                        {value === 0 ? "" : value}
                    </div>
                ))
            ))}
        </div>
    );
}

export default Grid;
