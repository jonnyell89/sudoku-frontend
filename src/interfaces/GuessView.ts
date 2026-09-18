export interface GuessView {
    active: boolean;
    selected: boolean;
    guess: "correct" | "incorrect";
    solved: boolean;
}
