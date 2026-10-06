export interface CellView {
    value: number;
    given: boolean;
    selected: boolean;
    highlightedValue: boolean;
    highlightedUnit: boolean;
    guessStatus: "none" | "correct" | "incorrect";
    candidates: number[];
}
