import type { Guess } from "../interfaces/Guess";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";

function updatePuzzle(puzzle: PuzzleResponse, correctGuess: Guess): PuzzleResponse {
    const newCells = puzzle.cells.map((rows, row) => 
        rows.map((cell, col) => 
            row === correctGuess.row && col === correctGuess.col
                ? { ...cell, value: correctGuess.value }
                : cell
        )
    );
    return { ...puzzle, cells: newCells };
}

export default updatePuzzle;
