import { Point } from './point';

export interface ShapeLimits {
    xLimits: Limits;
    yLimits: Limits;
}

export interface Limits {
    min: number;
    max: number;
}

export class Shape {
    // tslint:disable-next-line:variable-name
    constructor(private _points: Point[]) {}

    get points() {
        return this._points;
    }

    getLimits(): ShapeLimits {
        const colIndices = this.points.map(({ colIdx }) => colIdx);
        const rowIndices = this.points.map(({ rowIdx }) => rowIdx);

        return {
            xLimits: {
                min: Math.min(...colIndices),
                max: Math.max(...colIndices),
            },
            yLimits: {
                min: Math.min(...rowIndices),
                max: Math.max(...rowIndices),
            },
        };
    }

    translateBy(vector: Point) {
        return new Shape(this._points.map(point => point.add(vector)));
    }

    /* rotations around origin:
      - 90deg (x,y) -> (y, -x)
      - 180deg (x,y) -> (-y, -x)
      - 270deg (x,y) -> (y, -x)
   */

    /**
     * rotates {@param shape} anti-clockwise 90 degrees {@param n} times
     */
    rotate90n(n: number): Shape {
        let resultPoints: Point[] = [...this._points];
        let count = 0;

        while (count < n) {
            resultPoints = resultPoints.map(({ x, y }) => new Point(y, -x));
            count++;
        }

        return new Shape(resultPoints).normalise();
    }

    /**
     *   places shape at center in top right quadrant, centered around (0, 0)
     */
    normalise() {
        const shapeLimits = this.getLimits();
        const translationVector = new Point(
            shapeLimits.xLimits.min,
            shapeLimits.yLimits.min
        );

        return new Shape(
            this.points.map(point => point.subtract(translationVector))
        );
    }
}
