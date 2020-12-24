import { animation, animate, style, keyframes } from '@angular/animations';

export const emptyFillAnimation = animation([
    animate(
        '200ms',
        keyframes([
            style({
                background: 'rgb(0,0,255)',
                fill: 'rgb(0,0,255)',
                transform: 'scale(1.0)', // 'rotate(0deg) scale(1.0)',
                offset: 0,
                'fill-opacity': 1,
            }),
            style({
                background: 'rgb(42,42,148)',
                fill: 'rgb(42,42,148)',
                transform: 'scale(0.5)', // 'rotate(90deg) scale(0.5)',
                offset: 0.5,
                'fill-opacity': 1,
            }),
            style({
                background: 'rgb(0,0,0)',
                fill: 'rgb(0,0,0)',
                transform: 'scale(0)', // 'rotate(180deg) scale(0)',
                offset: 1.0,
                'fill-opacity': 1,
            }),
        ])
    ),
]);
