export interface CellView {
    value: number;
    given: boolean;
    selectable: boolean;
    selected: boolean;
    highlighted: boolean;
    guessStatus: "none" | "correct" | "incorrect";
    candidates: number[];
}
