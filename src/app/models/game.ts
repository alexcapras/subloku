import { Point } from './models';
import { Utils } from '../utils/utils';

export class Game {
    // tslint:disable-next-line:variable-name
    private readonly _isFilled: boolean[][];
    // tslint:disable-next-line:variable-name
    private readonly _isHovered: boolean[][];

    constructor() {
        this._isFilled = Utils.createGrid<boolean>(9, false);
        this._isHovered = Utils.createGrid<boolean>(9, false);
    }

    public isFilled(xIndex: number, yIndex: number) {
        return this._isFilled[xIndex][yIndex];
    }

    public isHovered(xIndex: number, yIndex: number) {
        return this._isHovered[xIndex][yIndex];
    }

    fill(point: Point) {
        if (Utils.isPointOutOfBounds(point, this._isFilled)) {
            this._isFilled[point.xIndex][point.yIndex] = true;
        } else {
            console.log(`Fill point: ${JSON.stringify(point)} out of bounds`);
            return;
        }

        const bigSquareStartPoint: Point = {
            xIndex: Math.floor(point.xIndex / 3.0) * 3,
            yIndex: Math.floor(point.yIndex / 3.0) * 3,
        };

        const clearBigSquare = this.isBigSquareFilled(bigSquareStartPoint);
        const clearVerticalLine = this.isVerticalLineFilled(point.xIndex);
        const clearHorizontalLine = this.isHorizontalLineFilled(point.yIndex);

        this.resetIsHovered();

        setTimeout(() => {
            if (clearBigSquare) {
                this.clearBigSquare(bigSquareStartPoint);
            }

            if (clearVerticalLine) {
                this.clearVerticalLine(point.xIndex);
            }

            if (clearHorizontalLine) {
                this.clearHorizontalLine(point.yIndex);
            }
        }, 200);
    }

    hover(point: Point) {
        this.resetIsHovered();

        if (Utils.isPointOutOfBounds(point, this._isHovered)) {
            this._isHovered[point.xIndex][point.yIndex] = true;
        } else {
            console.log(`Hover point: ${JSON.stringify(point)} out of bounds`);
        }
    }

    /* ************************
     * PRIVATE METHODS
     * ************************/

    private resetIsHovered() {
        this._isHovered.forEach(row => row.fill(false));
    }

    private clearBigSquare(startPoint: Point) {
        for (let x = startPoint.xIndex; x < startPoint.xIndex + 3; x++) {
            for (let y = startPoint.yIndex; y < startPoint.yIndex + 3; y++) {
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

        for (let x = startPoint.xIndex; x < startPoint.xIndex + 3; x++) {
            for (let y = startPoint.yIndex; y < startPoint.yIndex + 3; y++) {
                isBigSquareFilled = isBigSquareFilled && this._isFilled[x][y];
            }
        }

        return isBigSquareFilled;
    }
}
