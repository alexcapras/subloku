import { Point, Shape } from '../models/models';

export class Transformers {
    /* rotations around origin:
        - 90deg (x,y) -> (y, -x)
        - 180deg (x,y) -> (-y, -x)
        - 270deg (x,y) -> (y, -x)
     */

    /**
     * rotates {@param shape} anti-clockwise 90 degrees
     */
    static rotate90 = (shape: Shape): Shape => {
        return Transformers.rotate90n(1)(shape);
    };

    /**
     * rotates {@param shape} anti-clockwise 90 degrees {@param n} times
     */
    static rotate90n = (n: number) => (shape: Shape): Shape => {
        const result: Shape = { points: shape.points };
        let count = 0;

        while (count < n) {
            result.points = result.points.map(({ colIdx, rowIdx }) => ({
                colIdx: rowIdx,
                rowIdx: -colIdx,
            }));
            count++;
        }

        return Transformers.normalise(result);
    };

    // places shape at center in top right quadrant
    static normalise = (shape: Shape): Shape => {
        const minCol = Math.min(...shape.points.map(({ colIdx }) => colIdx));
        const minRow = Math.min(...shape.points.map(({ rowIdx }) => rowIdx));

        return {
            points: shape.points.map(({ colIdx, rowIdx }) => ({
                colIdx: colIdx - minCol,
                rowIdx: rowIdx - minRow,
            })),
        };
    };
}
