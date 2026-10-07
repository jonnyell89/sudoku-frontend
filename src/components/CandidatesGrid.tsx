import { MAX_VALUE } from "../constants/sudoku";

interface CandidatesGridProps {
    candidates: number[];
}

function CandidatesGrid({
    candidates,
}: CandidatesGridProps) {

    const numbers: number[] = Array.from({ length: MAX_VALUE }, (_, index) => index + 1);

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
