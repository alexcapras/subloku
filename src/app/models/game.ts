import { GameBoard } from './game-board';
import { ShapeQueue } from './shape-queue';
import { Vector } from './vector';

export class Game {
    // tslint:disable-next-line:variable-name
    private _gameBoard: GameBoard;

    // tslint:disable-next-line:variable-name
    private _shapeQueue: ShapeQueue;

    // tslint:disable-next-line:variable-name
    private _isGameOver: boolean;

    // tslint:disable-next-line:variable-name
    private _score: number;

    constructor() {
        this._gameBoard = new GameBoard();
        this._shapeQueue = new ShapeQueue();
        this._isGameOver = false;
        this._score = 0;
    }

    get board(): GameBoard {
        return this._gameBoard;
    }

    get shapeQueue(): ShapeQueue {
        return this._shapeQueue;
    }

    get isGameOver(): boolean {
        return this._isGameOver;
    }

    get score(): number {
        return this._score;
    }

    /**
     * @param points - a list of points to fill in the {@link _gameBoard}
     * @param shapeQueueIdx - the index of the shape in the {@link _shapeQueue} used to fill the points
     */
    fillPoints(points: Vector[], shapeQueueIdx: number) {
        const success = this._gameBoard.fill(points);

        if (success) {
            this._score += points.length;
            this._shapeQueue.remove(shapeQueueIdx);
            const hasMoreShapes = this._shapeQueue.items.find(shape => !!shape);

            if (!hasMoreShapes) {
                this._shapeQueue.reset();
            }

            setTimeout(() => {
                this._score += this._gameBoard.clearFilledAreas();
                this.checkGameOver();
            }, 0);
        }
    }

    private checkGameOver() {
        for (const item of this._shapeQueue.items) {
            if (!!item && !!item.shape) {
                item.canPlace = this._gameBoard.canPlace(item.shape);
            }
        }

        this._isGameOver = !this._shapeQueue.items
            .filter(item => !!item)
            .find(item => item.canPlace);
    }
}
