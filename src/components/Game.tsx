import { useEffect, useState } from "react";
import type { Cell } from "../interfaces/Cell";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import { createPuzzle } from "../api/puzzleApi";
import Grid from "./Grid";
import GuessSelector from "./GuessSelector";

function Game() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    
    useEffect(() => {
        const fetchPuzzle = async () => {
            try {
                setPuzzle(await createPuzzle("EASY"));
            } catch (error) {
                console.error(`Failed to fetch puzzle: ${error}`);
            }
        };

        fetchPuzzle();
    }, []);

    if (puzzle === null) return <div>Loading...</div>;

    return (
        <div className="game">
            <Grid
                puzzle={puzzle}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
            />
            <GuessSelector
                selectedCell={selectedCell}
            />
        </div>
    )
}

export default Game;
