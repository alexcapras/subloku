import { animation, animate, style, keyframes } from '@angular/animations';

export const emptyFillAnimation = animation([
    animate(
        '3s',
        keyframes([
            style({
                background: 'black',
                fill: 'black',
                transform: 'rotate(0deg) scale(1.0)',
                offset: 0,
                'fill-opacity': 1,
            }),
            style({
                background: 'red',
                fill: 'red',
                transform: 'rotate(90deg) scale(0.5)',
                offset: 0.5,
                'fill-opacity': 1,
            }),
            style({
                background: 'green',
                fill: 'green',
                transform: 'rotate(180deg) scale(0)',
                offset: 1.0,
                'fill-opacity': 1,
            }),
        ])
    ),
]);
