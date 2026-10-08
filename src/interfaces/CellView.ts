export interface CellView {
    value: number;
    given: boolean;
    selected: boolean;
    guessStatus: "none" | "correct" | "incorrect";
    candidates: number[];
    highlightUnit: boolean;
    highlightSameValue: boolean;
    highlightSameIncorrectValue: boolean;
}
