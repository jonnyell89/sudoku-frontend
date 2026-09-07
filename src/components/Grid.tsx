import { useEffect, useState } from "react";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import { createPuzzle } from "../api/puzzleApi";

function Grid() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);

    useEffect(() => {
        const fetchPuzzle = async () => {
            try {
                setPuzzle(await createPuzzle("EASY"));
            } catch (error) {
                console.error("Failed to fetch puzzle: ", error);
            }
        };

        fetchPuzzle();
    }, []);

    if (puzzle === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid">
            {puzzle.cells.map((rows, row) => (
                rows.map((cell, col) => {
                    const boxRight = col === 2 || col === 5;
                    const boxBottom = row === 2 || row === 5;
                    const className = [
                        "cell",
                        cell.given ? "given" : "",
                        boxRight ? "box-right" : "",
                        boxBottom ? "box-bottom" : "",
                    ].filter(Boolean).join(" ");
                    return (
                        <div className={className} key={`${row}-${col}`}>
                            {cell.value === 0 ? "" : cell.value}
                        </div>
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
