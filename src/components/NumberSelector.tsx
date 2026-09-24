import type { GuessView } from "../interfaces/GuessView";

interface NumberSelectorProps {
    guessViews: GuessView[];
    onGuess: (guess: number) => void;
}

function NumberSelector({ guessViews, onGuess }: NumberSelectorProps) {

    return(
        <div className="number-selector">
            {guessViews.map((guessView) => {
                const className = [
                    "guess",
                    guessView.active ? "active" : "",
                    guessView.selected ? "selected" : "",
                    guessView.guessStatus !== "none" ? guessView.guessStatus : "",
                ].filter(Boolean).join(" ");
                return (
                    <div
                        key={guessView.value}
                        className={className}
                        onClick={() => onGuess(guessView.value)}
                    >
                        {guessView.value}
                    </div>
                )
            })}
        </div>
    )
}

export default NumberSelector;
