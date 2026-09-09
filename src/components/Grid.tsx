import type { Cell } from "../interfaces/Cell";
import type { PuzzleResponse } from "../interfaces/PuzzleResponse";

interface GridProps {
    puzzle: PuzzleResponse;
    selectedCell: Cell | null;
    setSelectedCell: (selectedCell: Cell | null) => void;
}

function Grid({ puzzle, selectedCell, setSelectedCell }: GridProps) {

    const handleClick = (row: number, col: number, given: boolean) => {
        if (!given) {
            setSelectedCell({ row, col });
        }
    }

    return (
        <div className="grid">
            {puzzle.cells.map((rows, row) => (
                rows.map((cell, col) => {
                    const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
                    const boxRight = col === 2 || col === 5; // refers to box styling
                    const boxBottom = row === 2 || row === 5; // refers to box styling
                    const className = [
                        "cell",
                        cell.given ? "given" : "",
                        isSelectedCell ? "selected-cell" : "",
                        boxRight ? "box-right" : "", // refers to box styling
                        boxBottom ? "box-bottom" : "", // refers to box styling
                    ].filter(Boolean).join(" ");
                    return (
                        <div 
                            className={className} 
                            key={`${row}-${col}`} 
                            onClick={() => {handleClick(row, col, cell.given)}}
                        >
                            {cell.value === 0 ? "" : cell.value}
                        </div>
                    );
                })
            ))}
        </div>
    );
}

export default Grid;
