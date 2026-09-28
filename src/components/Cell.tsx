import type { BoxView } from "../interfaces/BoxView";
import type { CellView } from "../interfaces/CellView";

interface CellProps {
    cellView: CellView;
    boxView: BoxView;
    onSelect: () => void;
}

function Cell({
    cellView,
    boxView,
    onSelect,
}: CellProps) {

    const handleClick = () => {
        if (cellView.selectable) {
            onSelect();
        }
    };

    const className = [
        "cell",
        cellView.given ? "given" : "",
        cellView.selectable ? "selectable" : "",
        cellView.selected ? "selected" : "",
        cellView.highlighted ? "highlighted" : "",
        cellView.guessStatus !== "none" ? cellView.guessStatus : "",
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
    );
}

export default Cell;
