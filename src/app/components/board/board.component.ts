import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as constants from '../../utils/constants';

import {
  trigger,
  style,
  animate,
  transition, keyframes,
} from '@angular/animations';

export interface Square {
  width: number;
  height: number;
  xIndex: number;
  yIndex: number;
  xPos: number;
  yPos: number;
}

export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('emptyFill', [
      transition('filled => empty', [
        animate('0.3s', keyframes([
          style({ fill: 'black', transform: 'rotate(0deg) scale(1.0)', offset: 0}),
          style({ fill: 'red', transform: 'rotate(90deg) scale(0.5)', offset: 0.5}),
          style({ fill: 'green', transform: 'rotate(180deg) scale(0)', offset: 1.0})
        ])),
      ]),
    ])
  ]
})
export class BoardComponent implements OnInit {

  TOTAL_SIZE = constants.TOTAL_SIZE;

  squares: Square[];
  secondaryLines: Line[];
  primaryLines: Line[];

  @ViewChild('board', {static: false})
  board: ElementRef;

  @Input()
  isFilled: boolean[][];

  @Input()
  isHovered: boolean[][];

  ngOnInit() {
    const xIndices = Array(9).fill(0).map((x, i) => i);
    const yIndices = [...xIndices];

    // @ts-ignore
    this.squares = xIndices.flatMap(xIndex =>
      yIndices.map(yIndex => this.mapIndicesToSquare(xIndex, yIndex))
    );

    const lineIndices = Array(10).fill(0).map((x, i) => i);
    const primaryLineIndices = lineIndices.filter(x => !(x % 3));
    const secondaryLineIndices = lineIndices.filter(x => !!(x % 3));

    this.primaryLines = [
      ...primaryLineIndices.map(this.mapXIndexToVerticalLine),
      ...primaryLineIndices.map(this.mapYIndexToHorizontalLine)
    ];

    this.secondaryLines = [
      ...secondaryLineIndices.map(this.mapXIndexToVerticalLine),
      ...secondaryLineIndices.map(this.mapYIndexToHorizontalLine)
    ];
  }

  private mapIndicesToSquare = (xIndex: number, yIndex: number): Square => ({
    xIndex,
    yIndex,
    width: constants.SQUARE_SIZE,
    height: constants.SQUARE_SIZE,
    xPos: xIndex * constants.SQUARE_SIZE + constants.OFFSET,
    yPos: yIndex * constants.SQUARE_SIZE + constants.OFFSET,
  });

  private mapYIndexToHorizontalLine = (yIndex: number): Line => ({
    x1: constants.OFFSET,
    y1: yIndex * constants.SQUARE_SIZE + constants.OFFSET,
    x2: constants.TOTAL_SIZE - constants.OFFSET,
    y2: yIndex * constants.SQUARE_SIZE + constants.OFFSET,
  });

  private mapXIndexToVerticalLine = (xIndex: number): Line => ({
    x1: xIndex * constants.SQUARE_SIZE + constants.OFFSET,
    y1: constants.OFFSET,
    x2: xIndex * constants.SQUARE_SIZE + constants.OFFSET,
    y2: constants.TOTAL_SIZE - constants.OFFSET,
  });

  getSquareStyle(xIndex: number, yIndex: number) {
    const xx = (xIndex + 0.5) * constants.SQUARE_SIZE + constants.OFFSET;
    const yy = (yIndex + 0.5) * constants.SQUARE_SIZE + constants.OFFSET;

    const color = this.isFilled[xIndex][yIndex]
      ? 'rgb(0,0,255)'
      : this.isHovered[xIndex][yIndex]
        ? 'rgb(201, 201, 201)'
        : 'rgb(255, 255, 255)';

    return {
      'transform-origin': `${xx}px ${yy}px`, // <-- this is super important!
      fill: color,
    };
  }

  getSquareState(xIndex: number, yIndex: number) {
    return this.isFilled[xIndex][yIndex] ? 'filled' : 'empty';
  }
}
