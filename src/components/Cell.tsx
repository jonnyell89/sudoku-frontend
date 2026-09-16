interface CellProps {
    value: number;
    given: boolean;
    boxRight: boolean;
    boxBottom: boolean;
    isSelectedCell: boolean;
    isGuessCorrect: boolean | null;
    isSolved: boolean | null;
    onSelect: () => void;
}

function Cell({ value, given, boxRight, boxBottom, isSelectedCell, isGuessCorrect, isSolved, onSelect }: CellProps) {

    const handleClick = () => {
        if (!given) {
            onSelect();
        }
    }
      
    const className = [
        "cell",
        given ? "given" : "",
        boxRight ? "box-right" : "", // refers to box styling
        boxBottom ? "box-bottom" : "", // refers to box styling
        isSelectedCell ? "selected-cell" : "",
        isGuessCorrect === true ? "correct-guess" : "",
        isGuessCorrect === false ? "incorrect-guess" : "",
        isSolved === true ? "solved" : "",
    ].filter(Boolean).join(" ");
    
    return (
        <div
            className={className}
            onClick={handleClick}
        >
            {value === 0 ? "" : value}
        </div>
    )
}

export default Cell;
