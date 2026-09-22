import { DIFFICULTIES } from "../constants/sudoku";
import capitalise from "../utils/capitalise";

interface DifficultySelectorProps {
    onDifficulty: (difficulty: string) => void;
}

function DifficultySelector({ onDifficulty }: DifficultySelectorProps) {

    return (
        <div className="difficulty-selector">
            {DIFFICULTIES.map((difficulty) => {
                const className = [
                    "difficulty",
                    difficulty,
                    ].filter(Boolean).join(" ");
                    return (
                        <button
                            key={difficulty}
                            className={className}
                            onClick={() => onDifficulty(difficulty.toUpperCase())}
                        >
                            {capitalise(difficulty)}
                        </button>
                    )
                })}
        </div>
    )
}

export default DifficultySelector;
