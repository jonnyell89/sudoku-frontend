import { describe, expect, it } from "vitest";

import { getCellCandidates } from "./getCellCandidates";

describe("getCellCandidates", () => {
    const candidates = new Map<string, number[]>();
    candidates.set("1-3", [2, 7]);

    it("returns the candidates for the given cell", () => {
        expect(getCellCandidates(1, 3, candidates)).toEqual([2, 7]);
    });

    it("returns an empty array when the cell has no candidates", () => {
        expect(getCellCandidates(3, 1, candidates)).toEqual([]);
    });
});
