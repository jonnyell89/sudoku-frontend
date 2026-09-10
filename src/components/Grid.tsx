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
                    const boxRight = col === 2 || col === 5; // refers to box styling
                    const boxBottom = row === 2 || row === 5; // refers to box styling                    
                    const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
                    return (
                        <Cell
                            key={`${row}-${col}`}
                            value={cell.value}
                            given={cell.given}
                            boxRight={boxRight}
                            boxBottom={boxBottom}
                            isSelectedCell={isSelectedCell}
                            onSelect={() => setSelectedCell({ row, col })}
                        />
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
