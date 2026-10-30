import { describe, expect, it } from "vitest";

import { cellKey } from "./cellKey";

describe("cellKey", () => {
    it("returns the row and column joined by a hyphen", () => {
        expect(cellKey(1, 3)).toEqual("1-3");
    });
});
