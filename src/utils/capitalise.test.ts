import { describe, expect, it } from "vitest";

import { capitalise } from "./capitalise";

describe("capitalise", () => {
    it("capitalises the first letter and lowercases the rest", () => {
        expect(capitalise("cAPITALISE")).toEqual("Capitalise");
    });

    it("returns an empty string when given an empty string", () => {
        expect(capitalise("")).toEqual("");
    });
});
