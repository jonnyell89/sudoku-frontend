interface ButtonPanelProps {
    candidatesMode: boolean;
    onToggle: () => void;
}

function ButtonPanel({ candidatesMode, onToggle }: ButtonPanelProps) {

    const className = [
        "candidates",
        candidatesMode ? "on" : "off",
    ].filter(Boolean).join(" ");

    return (
        <div className="button-panel">
            <button
                className={className}
                onClick={onToggle}
            >
                Candidates
            </button>
        </div>
    )
}

export default ButtonPanel;
