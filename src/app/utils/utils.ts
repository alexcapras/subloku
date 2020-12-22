import { Point, Position } from '../models/models';
import * as constants from './constants';

export class Utils {
    public static createGrid<T>(size: number, defaultValue: T): T[][] {
        return Array(size)
            .fill(defaultValue)
            .map(_ => Array(size).fill(defaultValue));
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
