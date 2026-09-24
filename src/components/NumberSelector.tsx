import type { GuessView } from "../interfaces/GuessView";
import type { NumberView } from "../interfaces/NumberView";

interface NumberSelectorProps {
    numberViews: NumberView[];
    guessViews: GuessView[];
    // candidateViews: CandidateView[];
    onGuess: (guess: number) => void;
}

function NumberSelector({ numberViews, guessViews, onGuess }: NumberSelectorProps) {

    return(
        <div className="number-selector">
            {numberViews.map((numberView) => {
                const className = [
                    "guess",
                    numberView.active ? "active" : "",
                    numberView.selected ? "selected" : "",
                    guessView.guessStatus !== "none" ? guessView.guessStatus : "",
                ].filter(Boolean).join(" ");
                return (
                    <div
                        key={numberView.value}
                        className={className}
                        onClick={() => onGuess(numberView.value)}
                    >
                        {numberView.value}
                    </div>
                )
            })}
        </div>
    )
}

export default NumberSelector;
