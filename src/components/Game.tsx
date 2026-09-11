import { useEffect, useState } from "react";
import type { SelectedCell } from "../interfaces/SelectedCell";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import type { GuessResponse } from "../interfaces/GuessResponse";
import { createPuzzle, makeGuess } from "../api/puzzleApi";
import Grid from "./Grid";
import GuessSelector from "./GuessSelector";
import type { GuessRequest } from "../interfaces/GuessRequest";
import updatePuzzle from "../utils/updatePuzzle";

function Game() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    
    // useEffect(() => {
    //     const fetchPuzzle = async () => {
    //         try {
    //             setPuzzle(await createPuzzle("EASY"));
    //         } catch (error) {
    //             console.error(`Failed to fetch puzzle: ${error}`);
    //         }
    //     };
    //     fetchPuzzle();
    // }, []);

    // if (puzzle === null) return <div>Loading...</div>;

    const handleGuess = async (guess: number) => {
        if (puzzle === null) return;
        if (!selectedCell) return;
        const guessRequest: GuessRequest = {
            row: selectedCell?.row,
            col: selectedCell?.col,
            value: guess,
        };
        try {
            const guessResponse: GuessResponse = await makeGuess(puzzle.id, guessRequest);
            if (guessResponse.correct) {
                setPuzzle((prev) => (prev ? updatePuzzle(prev, guessRequest) : prev));
            }
        } catch (error) {
            console.error(`Failed to submit guess: ${error}`);
        }
    }

    return (
        <div className="game">
            <Grid
                puzzle={puzzle}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
            />
            <GuessSelector
                selectedCell={selectedCell}
                onGuess={handleGuess}
            />
        </div>
    )
}

export default Game;
