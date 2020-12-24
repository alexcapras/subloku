import { Point, Shape, Position } from '../models/models';
import { Utils } from './utils';

export class Transformers {
    /**
     * Returns a shape from the {@param shape}, translated to a {@param origin}
     */
    static translate = (shape: Shape, origin: Point): Shape => ({
        points: shape.points.map(point => ({
            rowIdx: point.rowIdx + origin.rowIdx,
            colIdx: point.colIdx + origin.colIdx,
        })),
    });

    static translatePosition = (
        position: Position,
        origin: Position
    ): Position => ({
        x: position.x - origin.x,
        y: position.y - origin.y,
    });

    /**
     * Returns a new point of {@param point} relative to an {@param anchor} point
     */
    static relative = (point: Point, anchor: Point): Point => ({
        colIdx: point.colIdx - anchor.colIdx,
        rowIdx: point.rowIdx - anchor.rowIdx,
    });

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
    static rotate90n = (n: number) => /** */ (shape: Shape): Shape => {
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

    // places shape at center in top right quadrant, centered around (0, 0)
    static normalise = (shape: Shape): Shape => {
        const shapeLimits = Utils.shapeLimits(shape);

        return {
            points: shape.points.map(({ colIdx, rowIdx }) => ({
                colIdx: colIdx - shapeLimits.col.min,
                rowIdx: rowIdx - shapeLimits.row.min,
            })),
        };
    };
}
