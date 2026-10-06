import { GRID_SIZE } from "../constants/sudoku";

interface CandidatesGridProps {
    candidates: number[];
}

function CandidatesGrid({
    candidates,
}: CandidatesGridProps) {
    const numbers: number[] = Array.from({ length: GRID_SIZE }, (_, index) => index + 1);
    return (
        <div className="candidates-grid">
            {numbers.map((number) => {
                return (
                    <div
                        key={number}
                        className="candidates-cell"
                    >
                        {candidates.includes(number) ? number : ""}
                    </div>
                );
            })}
        </div>
    );
}

export default CandidatesGrid;
