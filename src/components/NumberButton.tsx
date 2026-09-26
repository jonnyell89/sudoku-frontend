import type { NumberView } from "../interfaces/NumberView";

interface NumberButtonProps {
    numberView: NumberView;
    onNumber: (value: number) => void;
}

function NumberButton({ numberView, onNumber }: NumberButtonProps) {

    const className = [
        numberView.active ? "active" : "",
        numberView.selected ? "selected" : "",
        numberView.numberStatus,
        numberView.guessStatus,
        numberView.candidate ? "candidate" : "",
    ].filter(Boolean).join(" ");

    return (
        <div
            className={className}
            onClick={() => onNumber(numberView.value)}
        >
            {numberView.value}
        </div>
    )
}

export default NumberButton;
