import { useState } from "react";
import type { SelectedCell } from "../interfaces/SelectedCell";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import type { GuessResponse } from "../interfaces/GuessResponse";
import { createPuzzle, makeGuess } from "../api/puzzleApi";
import Grid from "./Grid";
import GuessSelector from "./GuessSelector";
import type { GuessRequest } from "../interfaces/GuessRequest";
import updatePuzzle from "../utils/updatePuzzle";
import DifficultySelector from "./DifficultySelector";

function Game() {
    const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);

    const handleDifficulty = async (difficulty: string) => {
        try {
            // setIsLoading(true);
            setPuzzle(await createPuzzle(difficulty));
            // setIsLoading(false);
        } catch (error) {
            console.error(`Failed to fetch puzzle: ${error}`);
        }
    }

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
            <DifficultySelector
                onDifficulty={handleDifficulty}
            />
        </div>
    )
}

export default Game;
