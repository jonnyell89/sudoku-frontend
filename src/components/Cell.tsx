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
        cellView.guessStatus !== "none" ? cellView.guessStatus : "",
        cellView.highlightUnit ? "highlight-unit" : "",
        cellView.highlightSameValue ? "highlight-same-value" : "",
        cellView.highlightSameIncorrectValue ? "highlight-same-incorrect-value" : "",
        boxView.boxRight ? "box-right" : "",
        boxView.boxBottom ? "box-bottom" : "",
    ].filter(Boolean).join(" ");

    return (
        <div
            className={className}
            onClick={() => onSelect()}
        >
            {cellView.value !== 0
                ? cellView.value
                : cellView.candidates.length > 0
                    ? <CandidatesGrid candidates={cellView.candidates} />
                    : ""}
        </div>
    );
}

export default Cell;
