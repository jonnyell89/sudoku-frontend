import { useEffect, useState } from "react";
import type { Cell } from "../interfaces/Cell";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import { createPuzzle } from "../api/puzzleApi";

function Grid() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [selected, setSelected] = useState<Cell | null>(null);

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

    const handleClick = (row: number, col: number, given: boolean) => {
        if (!given) {
            setSelected({ row, col });
        }
    }

    if (puzzle === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid">
            {puzzle.cells.map((rows, row) => (
                rows.map((cell, col) => {
                    const boxRight = col === 2 || col === 5;
                    const boxBottom = row === 2 || row === 5;
                    const isSelected = selected?.row === row && selected?.col === col;
                    const className = [
                        "cell",
                        cell.given ? "given" : "",
                        boxRight ? "box-right" : "", // refers to box styling
                        boxBottom ? "box-bottom" : "", // refers to box styling
                        isSelected ? "selected" : "",
                    ].filter(Boolean).join(" ");
                    return (
                        <div 
                            className={className} 
                            key={`${row}-${col}`} 
                            onClick={() => {handleClick(row, col, cell.given)}}
                        >
                            {cell.value === 0 ? "" : cell.value}
                        </div>
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
