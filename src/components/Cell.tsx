import type { CellView } from "../interfaces/CellView";

interface CellProps {
    cellView: CellView;
    onSelect: () => void;
}

function Cell({ cellView, onSelect }: CellProps) {

    const handleClick = () => {
        if (!cellView.given) {
            onSelect();
        }
    }
      
    const className = [
        "cell",
        cellView.given ? "given" : "",
        cellView.selected ? "selected" : "",
        cellView.guessStatus != "none" ? cellView.guessStatus : "",
        cellView.boxRight ? "box-right" : "", // refers to box styling
        cellView.boxBottom ? "box-bottom" : "", // refers to box styling
    ].filter(Boolean).join(" ");
    
    return (
        <div
            className={className}
            onClick={handleClick}
        >
            {cellView.value === 0 ? "" : cellView.value}
        </div>
    )
}

export default Cell;
