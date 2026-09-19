import Cell from "../components/Cell";
import type { CellView } from "../interfaces/CellView";

interface GridProps {
    cellViews: CellView[][];
    isEmpty: boolean;
    isSolved: boolean;
    onSelect: (row: number, col: number) => void;
}

function Grid({ cellViews, isEmpty, isSolved, onSelect }: GridProps) {

    const className = [
        "grid",
        isEmpty ? "empty" : "",
        isSolved ? "solved" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={className}>
            {cellViews.map((rows, row) => (
                rows.map((cellView, col) => {
                    return (
                        <Cell
                            key={`${row}-${col}`}
                            cellView={cellView}
                            onSelect={() => onSelect(row, col)}
                        />
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
