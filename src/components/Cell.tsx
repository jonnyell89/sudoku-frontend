import type { BoxView } from "../interfaces/BoxView";
import type { CellView } from "../interfaces/CellView";

interface CellProps {
    cellView: CellView;
    boxView: BoxView;
    onSelect: () => void;
}

function Cell({ cellView, boxView, onSelect }: CellProps) {

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
        boxView.boxRight ? "box-right" : "",
        boxView.boxBottom ? "box-bottom" : "",
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
