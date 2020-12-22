import { Line, Square } from '../models/models';
import * as constants from './constants';

export class Mappers {
    static mapPointToSquare = (xIndex: number, yIndex: number): Square => ({
        xIndex,
        yIndex,
        width: constants.SQUARE_SIZE,
        height: constants.SQUARE_SIZE,
        xPos: xIndex * constants.SQUARE_SIZE + constants.OFFSET,
        yPos: yIndex * constants.SQUARE_SIZE + constants.OFFSET,
    });

    static mapYIndexToHorizontalLine = (yIndex: number): Line => ({
        x1: constants.OFFSET,
        y1: yIndex * constants.SQUARE_SIZE + constants.OFFSET,
        x2: constants.TOTAL_SIZE - constants.OFFSET,
        y2: yIndex * constants.SQUARE_SIZE + constants.OFFSET,
    });

    static mapXIndexToVerticalLine = (xIndex: number): Line => ({
        x1: xIndex * constants.SQUARE_SIZE + constants.OFFSET,
        y1: constants.OFFSET,
        x2: xIndex * constants.SQUARE_SIZE + constants.OFFSET,
        y2: constants.TOTAL_SIZE - constants.OFFSET,
    });
}
