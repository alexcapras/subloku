import { Vector } from '../models/vector';

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

    public static createLinearGrid(cols: number, rows: number): Vector[][] {
        return this.createLinearArray(cols).map(col =>
            this.createLinearArray(rows).map(row => new Vector(col, row))
        );
    }

    public static isPointInBounds(point: Vector, array: any[][]) {
        return (
            point.x < array.length &&
            point.x >= 0 &&
            point.y < array[point.x].length &&
            point.y >= 0
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

    public static withinLimits = (
        value: number,
        min: number,
        max: number
    ): number => {
        return value < min ? min : value > max ? max : value;
    };
}
