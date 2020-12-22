import { Shape } from '../models/models';

export const shapes: Shape[] = [
    {
        // Single point
        points: [{ colIdx: 0, rowIdx: 0 }],
    },
    {
        // Small (2-cell) line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
        ],
    },
    {
        // Medium (3-cell) line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 0, rowIdx: 2 },
        ],
    },
    {
        // Big (4-cell) line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 0, rowIdx: 2 },
            { colIdx: 0, rowIdx: 3 },
        ],
    },
    {
        // Huge (5-cell) line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 0, rowIdx: 2 },
            { colIdx: 0, rowIdx: 3 },
            { colIdx: 0, rowIdx: 4 },
        ],
    },
    {
        // Small square
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 1, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 1, rowIdx: 1 },
        ],
    },
    {
        // Small L
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 1, rowIdx: 1 },
        ],
    },
    {
        // Medium L
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 0, rowIdx: 2 },
            { colIdx: 1, rowIdx: 2 },
        ],
    },
    {
        // Big L
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 0, rowIdx: 2 },
            { colIdx: 1, rowIdx: 2 },
            { colIdx: 2, rowIdx: 2 },
        ],
    },
    {
        // Cross (Like on the Swiss flag)
        points: [
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 1, rowIdx: 0 },
            { colIdx: 1, rowIdx: 1 },
            { colIdx: 1, rowIdx: 2 },
            { colIdx: 2, rowIdx: 1 },
        ],
    },
    {
        // Big T
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 1, rowIdx: 0 },
            { colIdx: 2, rowIdx: 0 },
            { colIdx: 1, rowIdx: 1 },
            { colIdx: 1, rowIdx: 2 },
        ],
    },
];
