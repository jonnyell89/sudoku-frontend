export interface GuessView {
    value: number;
    active: boolean;
    selected: boolean;
    guess: "none" | "correct" | "incorrect";
    solved: boolean;
}
