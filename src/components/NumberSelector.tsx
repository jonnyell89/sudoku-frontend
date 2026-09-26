import type { NumberView } from "../interfaces/NumberView";
import NumberButton from "./NumberButton";

interface NumberSelectorProps {
    numberViews: NumberView[];
    onNumber: (number: number) => void;
}

function NumberSelector({ numberViews, onNumber }: NumberSelectorProps) {

    return(
        <div className="number-selector">
            {numberViews.map((numberView) => {
                return (
                    <NumberButton
                        key={numberView.value}
                        numberView={numberView}
                        onNumber={() => onNumber(numberView.value)}
                    />
                )
            })}
        </div>
    )
}

export default NumberSelector;
