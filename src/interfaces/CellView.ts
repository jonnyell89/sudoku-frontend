export interface CellView {
    value: number;
    given: boolean;
    selected: boolean;
    guessStatus: "none" | "correct" | "incorrect";
}
