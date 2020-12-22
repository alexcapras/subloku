import { Point, Position } from '../models/models';
import * as constants from './constants';

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

    public static createGrid<T>(size: number, defaultValue: T): T[][] {
        return this.createArray(size, defaultValue).map(_ =>
            this.createArray(size, defaultValue)
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
            xIndex: Math.floor(relativeX / constants.SQUARE_SIZE),
            yIndex: Math.floor(relativeY / constants.SQUARE_SIZE),
        };
    }

    public static isPointOutOfBounds(point: Point, array: any[][]) {
        return (
            point.xIndex < array.length &&
            point.xIndex >= 0 &&
            point.yIndex < array[point.xIndex].length &&
            point.yIndex >= 0
        );
    }
}
