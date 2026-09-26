export type NumberStatus = "candidates" | "guess";

function resolveNumberStatus(
    candidatesMode: boolean,
): NumberStatus {
    return candidatesMode ? "candidates" : "guess";
}

export default resolveNumberStatus;
