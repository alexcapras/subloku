import { Shape } from '../models/models';

export const shapes: Shape[] = [
    {
        // Single point
        points: [{ colIdx: 0, rowIdx: 0 }],
    },
    {
        // Small (2-cell) vertical line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
        ],
    },
    {
        // Small (2-cell) horizontal line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 1, rowIdx: 0 },
        ],
    },
    {
        // Medium (3-cell) vertical line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 0, rowIdx: 2 },
        ],
    },
    {
        // Medium (3-cell) horizontal line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 1, rowIdx: 0 },
            { colIdx: 2, rowIdx: 0 },
        ],
    },
    {
        // Big (4-cell) vertical line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 0, rowIdx: 1 },
            { colIdx: 0, rowIdx: 2 },
            { colIdx: 0, rowIdx: 3 },
        ],
    },
    {
        // Big (3-cell) horizontal line
        points: [
            { colIdx: 0, rowIdx: 0 },
            { colIdx: 1, rowIdx: 0 },
            { colIdx: 2, rowIdx: 0 },
            { colIdx: 3, rowIdx: 0 },
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
        // Small L (backwards)
        points: [
            { colIdx: 1, rowIdx: 0 },
            { colIdx: 1, rowIdx: 1 },
            { colIdx: 0, rowIdx: 1 },
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
        // Big L (backwards)
        points: [
            { colIdx: 2, rowIdx: 0 },
            { colIdx: 2, rowIdx: 1 },
            { colIdx: 2, rowIdx: 2 },
            { colIdx: 1, rowIdx: 2 },
            { colIdx: 0, rowIdx: 2 },
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
