import type { GuessStatus } from "../utils/resolveGuessStatus";
import type { NumberStatus } from "../utils/resolveNumberStatus";

export interface NumberView {
    value: number;
    active: boolean;
    selected: boolean;
    numberStatus: NumberStatus;
    guessStatus: GuessStatus;
    candidate: boolean;
}
