import { Shape } from '../models/shape';
import { Vector } from '../models/vector';

export const shapes: Shape[] = [
    // Single point
    new Shape([new Vector(0, 0)]),
    // Small (2-cell) line
    new Shape([new Vector(0, 0), new Vector(0, 1)]),
    // Medium (3-cell) line
    new Shape([new Vector(0, 0), new Vector(0, 1), new Vector(0, 2)]),
    // Big (4-cell) line
    new Shape([
        new Vector(0, 0),
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(0, 3),
    ]),
    // Huge (5-cell) line
    new Shape([
        new Vector(0, 0),
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(0, 3),
        new Vector(0, 4),
    ]),
    // Small square
    new Shape([
        new Vector(0, 0),
        new Vector(0, 1),
        new Vector(1, 0),
        new Vector(1, 1),
    ]),
    // Small L
    new Shape([new Vector(0, 0), new Vector(0, 1), new Vector(1, 1)]),
    // Medium L
    new Shape([
        new Vector(0, 0),
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(1, 2),
    ]),
    // Big L
    new Shape([
        new Vector(0, 0),
        new Vector(0, 1),
        new Vector(0, 2),
        new Vector(1, 2),
        new Vector(2, 2),
    ]),
    // Cross (Like on the Swiss flag)
    new Shape([
        new Vector(0, 1),
        new Vector(1, 0),
        new Vector(1, 1),
        new Vector(1, 2),
        new Vector(2, 1),
    ]),
    // Little T
    new Shape([
        new Vector(0, 0),
        new Vector(1, 0),
        new Vector(2, 0),
        new Vector(1, 1),
    ]),
    // Big T
    new Shape([
        new Vector(0, 0),
        new Vector(1, 0),
        new Vector(2, 0),
        new Vector(1, 1),
        new Vector(1, 2),
    ]),
    // Snake Left
    new Shape([
        new Vector(0, 0),
        new Vector(1, 0),
        new Vector(1, 1),
        new Vector(2, 1),
    ]),
    // Snake Right
    new Shape([
      new Vector(0, 1),
      new Vector(1, 1),
      new Vector(1, 0),
      new Vector(2, 0),
    ]),
    // Small diagonal
    new Shape([new Vector(0, 0), new Vector(1, 1)]),
    // Big diagonal
    new Shape([new Vector(0, 0), new Vector(1, 1), new Vector(2, 2)]),
];

export const selectRandomShape = (): Shape => {
    return shapes[Math.floor(Math.random() * shapes.length)].rotate90n(
        Math.floor(Math.random() * 4)
    );
};
