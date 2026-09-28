export type NumberStatus = "candidates" | "guess";

export function resolveNumberStatus(
    candidatesMode: boolean,
): NumberStatus {
    return candidatesMode ? "candidates" : "guess";
}
