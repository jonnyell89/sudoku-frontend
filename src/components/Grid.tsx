import { UNIT_SIZE } from "../constants/sudoku";

function Grid() {

    const indices = Array.from({ length: UNIT_SIZE }, (_, index) => index);

    return (
        <div className="grid">
            {indices.map((box) => (
                <div className="box" key={box}>
                    {indices.map((cell) => (
                        <div className="cell" key={`${box}-${cell}`}></div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;
