import Cell from "../components/Cell";
import type { CellResponse } from "../interfaces/CellResponse";
import type { SelectedCell } from "../interfaces/SelectedCell";

interface GridProps {
    cells: CellResponse[][];
    selectedCell: SelectedCell | null;
    setSelectedCell: (selectedCell: SelectedCell | null) => void;
    setSelectedGuess: (selectedGuess: number | null) => void;
}

function Grid({ cells, selectedCell, setSelectedCell, setSelectedGuess }: GridProps) {

    const handleSelect = (row: number, col: number) => {
        setSelectedCell({ row, col });
        setSelectedGuess(null);
    }

    return (
        <div className="grid">
            {cells.map((rows, row) => (
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
                            onSelect={() => handleSelect(row, col)}
                        />
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
