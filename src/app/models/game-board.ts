import { Utils } from '../utils/utils';
import { Vector } from './vector';

export class GameBoard {
    // tslint:disable-next-line:variable-name
    private readonly _isFilled: boolean[][];
    // tslint:disable-next-line:variable-name
    private readonly _isHovered: boolean[][];

    // TODO: Make these constructor params with default vals
    private readonly MINOR_SIZE = 3; // number of rows/columns in a "big square"
    private readonly MAJOR_SIZE = 3; // number of "big squares" in a major row/column
    private readonly SIZE = this.MINOR_SIZE * this.MAJOR_SIZE;

    constructor() {
        this._isFilled = Utils.createGrid<boolean>(this.SIZE, this.SIZE, false);
        this._isHovered = Utils.createGrid<boolean>(
            this.SIZE,
            this.SIZE,
            false
        );
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
    fill(points: Vector[]) {
        const t0 = performance.now();

        const isFillSuccess = this.handleShapeEvent(points, p => {
            this._isFilled[p.x][p.y] = true;
        });

        if (isFillSuccess) {
            this.onSuccessfulFill();
        }

        const t1 = performance.now();
        console.log(`Call to fill() took ${t1 - t0} milliseconds.`);
        return isFillSuccess;
    }

    /**
     * Hover a list of {@param points} in the grid
     */
    hover(points: Vector[]): boolean {
        return this.handleShapeEvent(points, point => {
            this._isHovered[point.x][point.y] = true;
        });
    }

    /* ************************
     * PRIVATE METHODS
     * ************************/

    private handleShapeEvent(
        points: Vector[],
        onSuccess: (point: Vector) => void
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

    private onSuccessfulFill() {
        const bigSquaresToClear = Utils.createLinearGrid(
            this.MAJOR_SIZE,
            this.MAJOR_SIZE
        )
            .flatMap(arr => [...arr])
            .map(vector => vector.scaleUp(this.MINOR_SIZE))
            .filter(vector => this.isBigSquareFilled(vector));
        const verticalLinesToClear = Utils.createLinearArray(
            this.SIZE
        ).filter(x => this.isVerticalLineFilled(x));
        const horizontalLinesToClear = Utils.createLinearArray(
            this.SIZE
        ).filter(y => this.isHorizontalLineFilled(y));

        setTimeout(() => {
            const t0 = performance.now();

            bigSquaresToClear.forEach(vector => this.clearBigSquare(vector));
            verticalLinesToClear.forEach(x => this.clearVerticalLine(x));
            horizontalLinesToClear.forEach(y => this.clearHorizontalLine(y));

            const t1 = performance.now();
            console.log(
                `Call to onSuccessTimeout() took ${t1 - t0} milliseconds.`
            );
        }, 0);
    }

    private resetIsHovered() {
        this._isHovered.forEach(row => row.fill(false));
    }

    private isOutOfBoundsOrFilled = (point: Vector): boolean => {
        return (
            !Utils.isPointInBounds(point, this._isHovered) ||
            this.isFilled(point.x, point.y)
        );
    };

    private clearBigSquare(startPoint: Vector) {
        for (let x = startPoint.x; x < startPoint.x + this.MINOR_SIZE; x++) {
            for (
                let y = startPoint.y;
                y < startPoint.y + this.MINOR_SIZE;
                y++
            ) {
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

    private isBigSquareFilled(startPoint: Vector) {
        let isBigSquareFilled = true;

        for (let x = startPoint.x; x < startPoint.x + this.MINOR_SIZE; x++) {
            for (
                let y = startPoint.y;
                y < startPoint.y + this.MINOR_SIZE;
                y++
            ) {
                isBigSquareFilled = isBigSquareFilled && this._isFilled[x][y];
            }
        }

        return isBigSquareFilled;
    }
}
