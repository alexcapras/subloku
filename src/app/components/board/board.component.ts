import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as constants from '../../utils/constants';

import { trigger, transition, useAnimation } from '@angular/animations';
import { Line, Square } from '../../models/models';
import { Game } from '../../models/game';
import { Mappers } from '../../utils/mappers';
import { emptyFillAnimation } from '../../animations/empty-fill.animation';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    animations: [
        trigger('emptyFill', [
            transition('filled => empty', [useAnimation(emptyFillAnimation)]),
        ]),
    ],
})
export class BoardComponent implements OnInit {
    TOTAL_SIZE = constants.TOTAL_SIZE;

    squares: Square[];
    secondaryLines: Line[];
    primaryLines: Line[];

    @ViewChild('board', { static: false })
    board: ElementRef;

    @Input()
    game: Game;

    ngOnInit() {
        const xIndices = Array(9)
            .fill(0)
            .map((x, i) => i);
        const yIndices = [...xIndices];

        // @ts-ignore
        this.squares = xIndices.flatMap(xIndex =>
            yIndices.map(yIndex => Mappers.mapPointToSquare(xIndex, yIndex))
        );

        const lineIndices = Array(10)
            .fill(0)
            .map((x, i) => i);
        const primaryLineIndices = lineIndices.filter(x => !(x % 3));
        const secondaryLineIndices = lineIndices.filter(x => !!(x % 3));

        this.primaryLines = [
            ...primaryLineIndices.map(Mappers.mapXIndexToVerticalLine),
            ...primaryLineIndices.map(Mappers.mapYIndexToHorizontalLine),
        ];

        this.secondaryLines = [
            ...secondaryLineIndices.map(Mappers.mapXIndexToVerticalLine),
            ...secondaryLineIndices.map(Mappers.mapYIndexToHorizontalLine),
        ];
    }

    getSquareStyle(xIndex: number, yIndex: number) {
        const xx = (xIndex + 0.5) * constants.SQUARE_SIZE + constants.OFFSET;
        const yy = (yIndex + 0.5) * constants.SQUARE_SIZE + constants.OFFSET;

        const color = this.game.isFilled(xIndex, yIndex)
            ? 'rgb(0,0,255)'
            : this.game.isHovered(xIndex, yIndex)
            ? 'rgb(201, 201, 201)'
            : 'rgb(255, 255, 255)';

        return {
            'transform-origin': `${xx}px ${yy}px`, // <-- this is super important!
            fill: color,
        };
    }

    getSquareState(xIndex: number, yIndex: number) {
        return this.game.isFilled(xIndex, yIndex) ? 'filled' : 'empty';
    }
}
