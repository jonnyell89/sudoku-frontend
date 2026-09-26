import type { NumberView } from "../interfaces/NumberView";

interface NumberSelectorProps {
    numberViews: NumberView[];
    onNumber: (number: number) => void;
}

function NumberSelector({ numberViews, onNumber }: NumberSelectorProps) {

    return(
        <div className="number-selector">
            {numberViews.map((numberView) => {
                const className = [
                    numberView.active ? "active" : "",
                    numberView.selected ? "selected" : "",
                    numberView.numberStatus,
                    numberView.guessStatus,
                    numberView.candidate ? "candidate" : "",
                ].filter(Boolean).join(" ");
                return (
                    <div
                        key={numberView.value}
                        className={className}
                        onClick={() => onNumber(numberView.value)}
                    >
                        {numberView.value}
                    </div>
                )
            })}
        </div>
    )
}

export default NumberSelector;
