import type { BoxView } from "../interfaces/BoxView";
import type { CellView } from "../interfaces/CellView";
import CandidatesGrid from "./CandidatesGrid";

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

    const className = [
        "cell",
        cellView.given ? "given" : "",
        cellView.selected ? "selected" : "",
        cellView.highlightedValue ? "highlighted-value" : "",
        cellView.highlightedUnit ? "highlighted-unit" : "",
        cellView.guessStatus !== "none" ? cellView.guessStatus : "",
        boxView.boxRight ? "box-right" : "",
        boxView.boxBottom ? "box-bottom" : "",
    ].filter(Boolean).join(" ");

    return (
        <div
            className={className}
            onClick={() => onSelect()}
        >
            {cellView.candidates.length > 0
                ? <CandidatesGrid candidates={cellView.candidates} />
                : cellView.value === 0 ? "" : cellView.value}
        </div>
    );
}

export default Cell;
