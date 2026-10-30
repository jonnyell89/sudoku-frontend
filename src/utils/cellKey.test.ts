import { describe, expect, it } from "vitest";

import { cellKey } from "./cellKey";

describe("cellKey", () => {
    it("returns hyphen separated string", () => {
        expect(cellKey(1, 3)).toEqual("1-3");
    });
});
