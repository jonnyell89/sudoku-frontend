import { describe, expect, it } from "vitest";

import { toggleCandidate } from "./toggleCandidate";

describe("toggleCandidate", () => {
    it("adds a candidate when absent", () => {
        expect(toggleCandidate([], 5)).toEqual([5]);
    });

    it("removes a candidate when present", () => {
        expect(toggleCandidate([2, 5, 7], 5)).toEqual([2, 7]);
    });

    it("keeps the candidates in ascending order when adding", () => {
        expect(toggleCandidate([2, 7], 5)).toEqual([2, 5, 7]);
    });

    it("sorts unordered candidates when adding", () => {
        expect(toggleCandidate([9, 1], 5)).toEqual([1, 5, 9]);
    });

    it("does not mutate the original array", () => {
        const input = [2, 7];
        toggleCandidate(input, 5);
        expect(input).toEqual([2, 7]);
    });

    it("returns an empty array when removing the last candidate", () => {
        expect(toggleCandidate([5], 5)).toEqual([]);
    });
});
