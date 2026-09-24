function toggleCandidates(cellCandidates: number[], candidate: number) {
    if (cellCandidates.includes(candidate)) {
        return cellCandidates.filter((value) => value !== candidate);
    }
    return [...cellCandidates, candidate].sort((a, b) => a - b);
}

export default toggleCandidates;
