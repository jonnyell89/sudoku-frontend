function resolveCandidates(
    row: number, 
    col: number, 
    candidates: Map<string, number[]>
): number[] {
    const key: string = `${row}-${col}`;
    return candidates.get(key) ?? [];
}

export default resolveCandidates;
