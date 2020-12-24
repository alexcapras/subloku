import { Point, Position, Shape } from '../models/models';
import * as constants from './constants';

export interface ShapeLimits {
    col: ShapeLimit;
    row: ShapeLimit;
}

export interface ShapeLimit {
    min: number;
    max: number;
}

export class Utils {
    /**
     * Create array from 0 to {@param size} - 1.
     */
    public static createLinearArray(size: number) {
        return this.createArray<number>(size, 0).map((_, index) => index);
    }

    public static createArray<T>(size: number, defaultValue: T): T[] {
        return Array(size).fill(defaultValue);
    }

    public static createGrid<T>(
        cols: number,
        rows: number,
        defaultValue: T
    ): T[][] {
        return this.createArray(cols, defaultValue).map(_ =>
            this.createArray(rows, defaultValue)
        );
    }

    public static calcRelativePosition(
        position: Position,
        anchorPosition: Position
    ): Position {
        return {
            x: position.x - anchorPosition.x,
            y: position.y - anchorPosition.y,
        };
    }

    public static mapPositionToPoint(position: Position): Point {
        const relativeX = position.x - constants.OFFSET;
        const relativeY = position.y - constants.OFFSET;

        return {
            colIdx: Math.floor(relativeX / constants.SQUARE_SIZE),
            rowIdx: Math.floor(relativeY / constants.SQUARE_SIZE),
        };
    }

    public static isPointInBounds(point: Point, array: any[][]) {
        return (
            point.colIdx < array.length &&
            point.colIdx >= 0 &&
            point.rowIdx < array[point.colIdx].length &&
            point.rowIdx >= 0
        );
    }

    public static getOrDefault<T>(
        grid: T[][],
        colIdx: number,
        rowIdx: number,
        defaultVal: T
    ): T {
        if (
            !grid ||
            !grid.length ||
            colIdx < 0 ||
            colIdx >= grid.length ||
            rowIdx < 0 ||
            rowIdx >= grid[colIdx].length
        ) {
            return defaultVal;
        }

        return grid[colIdx][rowIdx];
    }

    public static shapeLimits = (shape: Shape): ShapeLimits => {
        const colIndices = shape.points.map(({ colIdx }) => colIdx);
        const rowIndices = shape.points.map(({ rowIdx }) => rowIdx);

        return {
            col: {
                min: Math.min(...colIndices),
                max: Math.max(...colIndices),
            },
            row: {
                min: Math.min(...rowIndices),
                max: Math.max(...rowIndices),
            },
        };
    };

    public static withinLimits = (
        value: number,
        min: number,
        max: number
    ): number => {
        return value < min ? min : value > max ? max : value;
    };
}
