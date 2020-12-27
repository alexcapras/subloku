import { Shape } from './shape';
import { selectRandomShape } from '../utils/shapes';

export interface ShapeQueueItem {
    shape: Shape;
    canPlace: boolean;
}

export class ShapeQueue {
    private SIZE = 3;
    constructor() {
        this.reset();
    }

    private queue: ShapeQueueItem[] = new Array(this.SIZE);

    get items(): ShapeQueueItem[] {
        return this.queue;
    }

    reset() {
        this.queue = [
            { canPlace: true, shape: selectRandomShape() },
            { canPlace: true, shape: selectRandomShape() },
            { canPlace: true, shape: selectRandomShape() },
        ];
    }

    remove(idx: number) {
        if (idx < 0 || idx >= this.SIZE) {
            console.log('ERROR: invalid shape idx to remove');
        }

        if (this.queue[idx] === null) {
            console.log('ERROR: shape already removed');
        }
        this.queue[idx] = null;
    }
}
