import type { CellView } from "../interfaces/CellView";

interface CellProps {
    view: CellView;
    onSelect: () => void;
}

function Cell({ view, onSelect }: CellProps) {

    const handleClick = () => {
        if (!view.given) {
            onSelect();
        }
    }
      
    const className = [
        "cell",
        view.given ? "given" : "",
        view.selected ? "selected" : "",
        view.guess,
        view.solved ? "solved" : "",
        view.boxRight ? "box-right" : "", // refers to box styling
        view.boxBottom ? "box-bottom" : "", // refers to box styling
    ].filter(Boolean).join(" ");
    
    return (
        <div
            className={className}
            onClick={handleClick}
        >
            {view.value === 0 ? "" : view.value}
        </div>
    )
}

export default Cell;
