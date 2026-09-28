export function toggleCandidate(
    cellCandidates: number[],
    candidate: number,
) {
    if (cellCandidates.includes(candidate)) {
        return cellCandidates.filter((value) => value !== candidate);
    }
    return [...cellCandidates, candidate].sort((a, b) => a - b);
}
