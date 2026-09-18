import Cell from "../components/Cell";
import type { CellView } from "../interfaces/CellView";

interface GridProps {
    cellViews: CellView[][];
    onSelect: (row: number, col: number) => void;
}

function Grid({ cellViews, onSelect }: GridProps) {

    return (
        <div className="grid">
            {cellViews.map((rows, row) => (
                rows.map((cellView, col) => {
                    return (
                        <Cell
                            key={`${row}-${col}`}
                            view={cellView}
                            onSelect={() => onSelect(row, col)}
                        />
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
