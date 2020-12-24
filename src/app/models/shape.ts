import { Vector } from './vector';

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
    constructor(private _points: Vector[]) {}

    get points() {
        return this._points;
    }

    getLimits(): ShapeLimits {
        const xIndices = this.points.map(({ x }) => x);
        const yIndices = this.points.map(({ y }) => y);

        return {
            xLimits: {
                min: Math.min(...xIndices),
                max: Math.max(...xIndices),
            },
            yLimits: {
                min: Math.min(...yIndices),
                max: Math.max(...yIndices),
            },
        };
    }

    translateBy(vector: Vector) {
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
        let resultPoints: Vector[] = [...this._points];
        let count = 0;

        while (count < n) {
            resultPoints = resultPoints.map(({ x, y }) => new Vector(y, -x));
            count++;
        }

        return new Shape(resultPoints).normalise();
    }

    /**
     *   places shape at center in top right quadrant, centered around (0, 0)
     */
    normalise() {
        const shapeLimits = this.getLimits();
        const translationVector = new Vector(
            shapeLimits.xLimits.min,
            shapeLimits.yLimits.min
        );

        return new Shape(
            this.points.map(point => point.subtract(translationVector))
        );
    }
}
