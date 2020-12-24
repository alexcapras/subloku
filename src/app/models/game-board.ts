import { Point } from './models';
import { Utils } from '../utils/utils';

export class GameBoard {
    // tslint:disable-next-line:variable-name
    private readonly _isFilled: boolean[][];
    // tslint:disable-next-line:variable-name
    private readonly _isHovered: boolean[][];

    constructor() {
        this._isFilled = Utils.createGrid<boolean>(9, 9, false);
        this._isHovered = Utils.createGrid<boolean>(9, 9, false);
    }

    public isFilledOrHovered(xIndex: number, yIndex: number) {
        return this.isFilled(xIndex, yIndex) || this.isHovered(xIndex, yIndex);
    }

    public isFilled(xIndex: number, yIndex: number) {
        return this._isFilled[xIndex][yIndex];
    }

    public isHovered(xIndex: number, yIndex: number) {
        return this._isHovered[xIndex][yIndex];
    }

    get filled() {
        return this._isFilled;
    }
    get hovered() {
        return this._isHovered;
    }

    /**
     * Fill a list of {@param points} in the grid
     */
    fill(points: Point[]) {
        const t0 = performance.now();

        const isFillSuccess = this.handleShapeEvent(points, p => {
            this._isFilled[p.colIdx][p.rowIdx] = true;
        });

        if (isFillSuccess) {
            this.onSuccessfulFill(points);
        }

        const t1 = performance.now();
        console.log(`Call to fill() took ${t1 - t0} milliseconds.`);
        return isFillSuccess;
    }

    /**
     * Hover a list of {@param points} in the grid
     */
    hover(points: Point[]): boolean {
        return this.handleShapeEvent(points, point => {
            this._isHovered[point.colIdx][point.rowIdx] = true;
        });
    }

    /* ************************
     * PRIVATE METHODS
     * ************************/

    private handleShapeEvent(
        points: Point[],
        onSuccess: (point: Point) => void
    ): boolean {
        this.resetIsHovered();

        const isAnyPointOutOfBoundsOrFilled = !!points.find(
            this.isOutOfBoundsOrFilled
        );

        if (isAnyPointOutOfBoundsOrFilled) {
            // console.log('a point is out of bounds, or has already been filled');
            return false;
        }

        points.forEach(onSuccess);

        return true;
    }

    private onSuccessfulFill(points: Point[]) {
        const point = points[0]; // TODO: check all
        const bigSquareStartPoint: Point = {
            colIdx: Math.floor(point.colIdx / 3.0) * 3,
            rowIdx: Math.floor(point.rowIdx / 3.0) * 3,
        };

        const clearBigSquare = this.isBigSquareFilled(bigSquareStartPoint);
        const clearVerticalLine = this.isVerticalLineFilled(point.colIdx);
        const clearHorizontalLine = this.isHorizontalLineFilled(point.rowIdx);

        setTimeout(() => {
            const t0 = performance.now();

            if (clearBigSquare) {
                this.clearBigSquare(bigSquareStartPoint);
            }

            if (clearVerticalLine) {
                this.clearVerticalLine(point.colIdx);
            }

            if (clearHorizontalLine) {
                this.clearHorizontalLine(point.rowIdx);
            }
            const t1 = performance.now();
            console.log(
                `Call to onSuccessTimeout() took ${t1 - t0} milliseconds.`
            );
        }, 0);
    }

    private resetIsHovered() {
        this._isHovered.forEach(row => row.fill(false));
    }

    private isOutOfBoundsOrFilled = (point: Point): boolean => {
        return (
            !Utils.isPointInBounds(point, this._isHovered) ||
            this.isFilled(point.colIdx, point.rowIdx)
        );
    };

    private clearBigSquare(startPoint: Point) {
        for (let x = startPoint.colIdx; x < startPoint.colIdx + 3; x++) {
            for (let y = startPoint.rowIdx; y < startPoint.rowIdx + 3; y++) {
                this._isFilled[x][y] = false;
            }
        }
    }

    private clearVerticalLine(xIndex: number) {
        for (let yIndex = 0; yIndex < this._isFilled[xIndex].length; yIndex++) {
            this._isFilled[xIndex][yIndex] = false;
        }
    }

    private clearHorizontalLine(yIndex: number) {
        // tslint:disable-next-line:prefer-for-of
        for (let xIndex = 0; xIndex < this._isFilled.length; xIndex++) {
            this._isFilled[xIndex][yIndex] = false;
        }
    }

    private isHorizontalLineFilled(yIndex: number) {
        let isHorizontalLineFilled = true;

        // tslint:disable-next-line:prefer-for-of
        for (let xIndex = 0; xIndex < this._isFilled.length; xIndex++) {
            isHorizontalLineFilled =
                isHorizontalLineFilled && this._isFilled[xIndex][yIndex];
        }

        return isHorizontalLineFilled;
    }

    private isVerticalLineFilled(xIndex: number) {
        let isVerticalLineFilled = true;

        // tslint:disable-next-line:prefer-for-of
        for (let yIndex = 0; yIndex < this._isFilled[xIndex].length; yIndex++) {
            isVerticalLineFilled =
                isVerticalLineFilled && this._isFilled[xIndex][yIndex];
        }

        return isVerticalLineFilled;
    }

    private isBigSquareFilled(startPoint: Point) {
        let isBigSquareFilled = true;

        for (let x = startPoint.colIdx; x < startPoint.colIdx + 3; x++) {
            for (let y = startPoint.rowIdx; y < startPoint.rowIdx + 3; y++) {
                isBigSquareFilled = isBigSquareFilled && this._isFilled[x][y];
            }
        }

        return isBigSquareFilled;
    }
}
