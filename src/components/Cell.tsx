import type { SelectedCell } from "../interfaces/SelectedCell";

interface CellProps {
    row: number;
    col: number;
    value: number;
    given: boolean;
    selectedCell: SelectedCell | null;
    setSelectedCell: (selectedCell: SelectedCell | null) => void;
}

function Cell({ row, col, value, given, selectedCell, setSelectedCell }: CellProps) {

    const handleClick = () => {
        if (!given) {
            setSelectedCell({ row, col });
        }
    }

    const isSelectedCell = selectedCell?.row === row && selectedCell?.col === col;
    const boxRight = col === 2 || col === 5; // refers to box styling
    const boxBottom = row === 2 || row === 5; // refers to box styling    
    const className = [
        "cell",
        given ? "given" : "",
        isSelectedCell ? "selected-cell" : "",
        boxRight ? "box-right" : "", // refers to box styling
        boxBottom ? "box-bottom" : "", // refers to box styling
    ].filter(Boolean).join(" ");
    return (
        <div
            className={className}
            onClick={handleClick}
        >
            {value === 0 ? "" : value}
        </div>
    )
}

export default Cell;
