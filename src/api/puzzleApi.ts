import axios from "axios";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";
import type { GuessResponse } from "../interfaces/GuessResponse";
import type { GuessRequest } from "../interfaces/GuessRequest";

const BASE_URL = "http://localhost:8080/api/puzzles"

export async function createPuzzle(difficulty: string): Promise<PuzzleResponse> {
    const response = await axios.post<PuzzleResponse>(
        `${BASE_URL}?difficulty=${difficulty}`
    );
    return response.data;
}

export async function makeGuess(id: number, guessRequest: GuessRequest): Promise<GuessResponse> {
    const response = await axios.post<GuessResponse>(
        `${BASE_URL}/${id}/guesses`,
        guessRequest
    );
    return response.data;
}
