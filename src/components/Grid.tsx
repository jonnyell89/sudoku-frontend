import Cell from "../components/Cell";
import type { CellView } from "../interfaces/CellView";
import { buildBoxView } from "../utils/buildBoxView";

interface GridProps {
    cellViews: CellView[][];
    isGridEmpty: boolean;
    isPuzzleSolved: boolean;
    onSelect: (row: number, col: number) => void;
}

function Grid({
    cellViews,
    isGridEmpty,
    isPuzzleSolved,
    onSelect,
}: GridProps) {

    const className = [
        "grid",
        isGridEmpty ? "empty" : "",
        isPuzzleSolved ? "solved" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={className}>
            {cellViews.map((rows, row) => (
                rows.map((cellView, col) => {
                    return (
                        <Cell
                            key={`${row}-${col}`}
                            cellView={cellView}
                            boxView={buildBoxView(row, col)}
                            onSelect={() => onSelect(row, col)}
                        />
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
