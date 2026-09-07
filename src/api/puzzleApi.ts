import axios from "axios";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";

const BASE_URL = "http://localhost:8080/api/puzzles"

export async function createPuzzle(difficulty: string): Promise<PuzzleResponse> {
    const response = await axios.post<PuzzleResponse>(
        `${BASE_URL}?difficulty=${difficulty}`
    );
    return response.data;
}
