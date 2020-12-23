import { Point, Shape } from './models';
import { Utils } from '../utils/utils';

export class Game {
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

    fill(shape: Shape, point: Point) {
        const points = shape.points.map(p => ({
            rowIdx: p.rowIdx + point.rowIdx,
            colIdx: p.colIdx + point.colIdx,
        }));

        points.forEach(p => {
            if (Utils.isPointOutOfBounds(p, this._isFilled)) {
                this._isFilled[p.colIdx][p.rowIdx] = true;
            } else {
                console.log(`Fill point: ${JSON.stringify(p)} out of bounds`);
                return;
            }
        });

        const bigSquareStartPoint: Point = {
            colIdx: Math.floor(point.colIdx / 3.0) * 3,
            rowIdx: Math.floor(point.rowIdx / 3.0) * 3,
        };

        const clearBigSquare = this.isBigSquareFilled(bigSquareStartPoint);
        const clearVerticalLine = this.isVerticalLineFilled(point.colIdx);
        const clearHorizontalLine = this.isHorizontalLineFilled(point.rowIdx);

        this.resetIsHovered();

        setTimeout(() => {
            if (clearBigSquare) {
                this.clearBigSquare(bigSquareStartPoint);
            }

            if (clearVerticalLine) {
                this.clearVerticalLine(point.colIdx);
            }

            if (clearHorizontalLine) {
                this.clearHorizontalLine(point.rowIdx);
            }
        }, 200);
    }

    hover(shape: Shape, point: Point) {
        const points = shape.points.map(p => ({
            rowIdx: p.rowIdx + point.rowIdx,
            colIdx: p.colIdx + point.colIdx,
        }));

        this.resetIsHovered();

        points.forEach(p => {
            if (Utils.isPointOutOfBounds(p, this._isHovered)) {
                this._isHovered[p.colIdx][p.rowIdx] = true;
            } else {
                console.log(`Hover point: ${JSON.stringify(point)} out of bounds`);
            }
        });
    }

    /* ************************
     * PRIVATE METHODS
     * ************************/

    private resetIsHovered() {
        this._isHovered.forEach(row => row.fill(false));
    }

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
