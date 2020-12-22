import {
    animation,
    trigger,
    animateChild,
    group,
    transition,
    animate,
    style,
    query,
    keyframes,
} from '@angular/animations';

export const emptyFillAnimation = animation([
    animate(
        '0.3s',
        keyframes([
            style({
                background: 'black',
                fill: 'black',
                transform: 'rotate(0deg) scale(1.0)',
                offset: 0,
            }),
            style({
                background: 'red',
                fill: 'red',
                transform: 'rotate(90deg) scale(0.5)',
                offset: 0.5,
            }),
            style({
                background: 'green',
                fill: 'green',
                transform: 'rotate(180deg) scale(0)',
                offset: 1.0,
            }),
        ])
    ),
]);
