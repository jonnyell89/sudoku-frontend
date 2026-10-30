import { describe, expect, it } from "vitest";

import { capitalise } from "./capitalise";

describe("capitalise", () => {
    it("capitalises first letter of str and lowercases the rest", () => {
        expect(capitalise("cAPITALISE")).toEqual("Capitalise");
    });

    it("returns an empty string", () => {
        expect(capitalise("")).toEqual("");
    });
});
