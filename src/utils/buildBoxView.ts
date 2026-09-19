import type { BoxView } from "../interfaces/BoxView";

function buildBoxView(row: number, col: number): BoxView {
    const boxRight = col === 2 || col === 5;
    const boxBottom = row === 2 || row === 5;
    return {
        boxRight: boxRight,
        boxBottom: boxBottom,
    }
}

export default buildBoxView
