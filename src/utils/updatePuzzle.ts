import type { GuessRequest } from "../interfaces/GuessRequest";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";

function updatePuzzle(puzzle: PuzzleResponse, correctGuess: GuessRequest): PuzzleResponse {
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
