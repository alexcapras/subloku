import { Shape } from '../models/shape';
import { Point } from '../models/point';

export const shapes: Shape[] = [
    // Single point
    new Shape([new Point(0, 0)]),
    // Small (2-cell) line
    new Shape([new Point(0, 0), new Point(0, 1)]),
    // Medium (3-cell) line
    new Shape([new Point(0, 0), new Point(0, 1), new Point(0, 2)]),
    // Big (4-cell) line
    new Shape([
        new Point(0, 0),
        new Point(0, 1),
        new Point(0, 2),
        new Point(0, 3),
    ]),
    // Huge (5-cell) line
    new Shape([
        new Point(0, 0),
        new Point(0, 1),
        new Point(0, 2),
        new Point(0, 3),
        new Point(0, 4),
    ]),
    // Small square
    new Shape([
        new Point(0, 0),
        new Point(0, 1),
        new Point(1, 0),
        new Point(1, 1),
    ]),
    // Small L
    new Shape([new Point(0, 0), new Point(0, 1), new Point(1, 1)]),
    // Medium L
    new Shape([
        new Point(0, 0),
        new Point(0, 1),
        new Point(0, 2),
        new Point(1, 2),
    ]),
    // Big L
    new Shape([
        new Point(0, 0),
        new Point(0, 1),
        new Point(0, 2),
        new Point(1, 2),
        new Point(2, 2),
    ]),
    // Cross (Like on the Swiss flag)
    new Shape([
        new Point(0, 1),
        new Point(1, 0),
        new Point(1, 1),
        new Point(1, 2),
        new Point(2, 1),
    ]),
    // Big T
    new Shape([
        new Point(0, 0),
        new Point(1, 0),
        new Point(2, 0),
        new Point(1, 1),
        new Point(1, 2),
    ]),
];
