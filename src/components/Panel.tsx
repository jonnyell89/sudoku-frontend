interface PanelProps {
    candidatesMode: boolean;
    onToggle: () => void;
}

function Panel({ candidatesMode, onToggle }: PanelProps) {

    const className = [
        "candidates",
        candidatesMode ? "on" : "off",
    ].filter(Boolean).join(" ");

    return (
        <div className="panel">
            <button
                className={className}
                onClick={onToggle}
            >
                Candidates
            </button>
        </div>
    )
}

export default Panel;
