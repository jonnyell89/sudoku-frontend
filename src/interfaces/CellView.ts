export interface CellView {
    value: number;
    given: boolean;
    selected: boolean;
    guess: "none" | "correct" | "incorrect";
    solved: boolean;
    boxRight: boolean;
    boxBottom: boolean;
}
