import Cell from "../components/Cell";
import type { SelectedCell } from "../interfaces/SelectedCell";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";

interface GridProps {
    puzzle: PuzzleResponse;
    selectedCell: SelectedCell | null;
    setSelectedCell: (selectedCell: SelectedCell | null) => void;
}

function Grid({ puzzle, selectedCell, setSelectedCell }: GridProps) {

    return (
        <div className="grid">
            {puzzle.cells.map((rows, row) => (
                rows.map((cell, col) => {
                    return (
                        <Cell
                            key={`${row}-${col}`}
                            row={row}
                            col={col}
                            value={cell.value}
                            given={cell.given}
                            selectedCell={selectedCell}
                            setSelectedCell={setSelectedCell}
                        />
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
