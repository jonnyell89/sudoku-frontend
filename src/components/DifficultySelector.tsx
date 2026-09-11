import capitalise from "../utils/capitalise";

interface DifficultySelectorProps {
    onDifficulty: (difficulty: string) => void;
}

function DifficultySelector({ onDifficulty }: DifficultySelectorProps) {

    const difficulties: string[] = ["easy", "medium", "hard"];

    return (
        <div className="difficulty-selector">
            {difficulties.map((difficulty) => {
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
