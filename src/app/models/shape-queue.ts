import { Shape } from './shape';
import { shapes } from '../utils/shapes';

export class ShapeQueue {
    private SIZE = 3;
    constructor() {
        this.reset();
    }

    private queue: Shape[] = new Array(this.SIZE);

    private static selectRandomShape(): Shape {
        return shapes[Math.floor(Math.random() * shapes.length)].rotate90n(
            Math.floor(Math.random() * 4)
        );
    }

    get shapes(): Shape[] {
        return this.queue;
    }

    reset() {
        this.queue = [
            ShapeQueue.selectRandomShape(),
            ShapeQueue.selectRandomShape(),
            ShapeQueue.selectRandomShape(),
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

        const hasMoreShapes = this.queue.find(shape => !!shape);

        if (!hasMoreShapes) {
            this.reset();
        }
    }
}
