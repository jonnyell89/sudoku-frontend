import type { GuessView } from "../interfaces/GuessView";
import type { NumberView } from "../interfaces/NumberView";

interface NumberProps {
    numberView: NumberView;
    guessView: GuessView;
    // candidateView: CandidateView;
    onGuess: () => void;
    // onCandidate: () => void;
}

function Number({ numberView, guessView, onGuess }: NumberProps) {}

export default Number;
