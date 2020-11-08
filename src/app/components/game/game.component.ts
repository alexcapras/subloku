import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { BehaviorSubject } from 'rxjs';
import { Point } from '../../utils/shapes';
import * as constants from '../../utils/constants';
import { Pos } from '../../models/models';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    @ViewChild('board', { static: false })
    element: ElementRef<BoardComponent>;

    mousePositionSubject: BehaviorSubject<Pos> = new BehaviorSubject({
        x: 0,
        y: 0,
    });

    isFilled: boolean[][];
    isHovered: boolean[][];

    private static isPointOutOfBounds(point: Point, array: any[][]) {
        return (
            point.xIndex < array.length &&
            point.xIndex >= 0 &&
            point.yIndex < array[point.xIndex].length &&
            point.yIndex >= 0
        );
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousePositionSubject.next({
            x: event.clientX,
            y: event.clientY,
        });
    }

    ngOnInit(): void {
        this.isFilled = Array(9)
            .fill(false)
            .map(_ => Array(9).fill(false));
        this.isHovered = Array(9)
            .fill(false)
            .map(_ => Array(9).fill(false));
    }

    onSquareFilled(point: Point) {
        if (GameComponent.isPointOutOfBounds(point, this.isFilled)) {
            this.isFilled[point.xIndex][point.yIndex] = true;
        } else {
            console.log(`Fill point: ${JSON.stringify(point)} out of bounds`);
            return;
        }

        const bigSquareStartPoint: Point = {
            xIndex: Math.floor(point.xIndex / 3.0) * 3,
            yIndex: Math.floor(point.yIndex / 3.0) * 3,
        };

        const clearBigSquare = this.isBigSquareFilled(bigSquareStartPoint);
        const clearVerticalLine = this.isVerticalLineFilled(point.xIndex);
        const clearHorizontalLine = this.isHorizontalLineFilled(point.yIndex);

        setTimeout(() => {
            if (clearBigSquare) {
                this.clearBigSquare(bigSquareStartPoint);
            }

            if (clearVerticalLine) {
                this.clearVerticalLine(point.xIndex);
            }

            if (clearHorizontalLine) {
                this.clearHorizontalLine(point.yIndex);
            }
        }, 200);
    }

    clearBigSquare(startPoint: Point) {
        for (let x = startPoint.xIndex; x < startPoint.xIndex + 3; x++) {
            for (let y = startPoint.yIndex; y < startPoint.yIndex + 3; y++) {
                this.isFilled[x][y] = false;
            }
        }
    }

    clearVerticalLine(xIndex: number) {
        for (let yIndex = 0; yIndex < this.isFilled[xIndex].length; yIndex++) {
            this.isFilled[xIndex][yIndex] = false;
        }
    }

    clearHorizontalLine(yIndex: number) {
        // tslint:disable-next-line:prefer-for-of
        for (let xIndex = 0; xIndex < this.isFilled.length; xIndex++) {
            this.isFilled[xIndex][yIndex] = false;
        }
    }

    isHorizontalLineFilled(yIndex: number) {
        let isHorizontalLineFilled = true;

        // tslint:disable-next-line:prefer-for-of
        for (let xIndex = 0; xIndex < this.isFilled.length; xIndex++) {
            isHorizontalLineFilled =
                isHorizontalLineFilled && this.isFilled[xIndex][yIndex];
        }

        return isHorizontalLineFilled;
    }

    isVerticalLineFilled(xIndex: number) {
        let isVerticalLineFilled = true;

        // tslint:disable-next-line:prefer-for-of
        for (let yIndex = 0; yIndex < this.isFilled[xIndex].length; yIndex++) {
            isVerticalLineFilled =
                isVerticalLineFilled && this.isFilled[xIndex][yIndex];
        }

        return isVerticalLineFilled;
    }

    isBigSquareFilled(startPoint: Point) {
        let isBigSquareFilled = true;

        for (let x = startPoint.xIndex; x < startPoint.xIndex + 3; x++) {
            for (let y = startPoint.yIndex; y < startPoint.yIndex + 3; y++) {
                isBigSquareFilled = isBigSquareFilled && this.isFilled[x][y];
            }
        }

        return isBigSquareFilled;
    }

    onDrop() {
        const point = this.getPointFromEvent(
            this.mousePositionSubject.getValue()
        );
        console.log(point);
        this.onSquareFilled(point);
        this.resetIsHovered();
    }

    onMove() {
        const point = this.getPointFromEvent(
            this.mousePositionSubject.getValue()
        );

        this.resetIsHovered();
        this.setHover(point);
    }

    private setHover(point: Point) {
        if (GameComponent.isPointOutOfBounds(point, this.isHovered)) {
            this.isHovered[point.xIndex][point.yIndex] = true;
        } else {
            console.log(`Hover point: ${JSON.stringify(point)} out of bounds`);
        }
    }

    private resetIsHovered() {
        this.isHovered.forEach(row => row.fill(false));
    }

    private getPointFromEvent(hoverPosition: { x: number; y: number }): Point {
        // @ts-ignore
        const rect = this.element.board.nativeElement.getBoundingClientRect();
        const relativeX = hoverPosition.x - rect.x - constants.OFFSET;
        const relativeY = hoverPosition.y - rect.y - constants.OFFSET;

        return {
            xIndex: Math.floor(relativeX / constants.SQUARE_SIZE),
            yIndex: Math.floor(relativeY / constants.SQUARE_SIZE),
        };
    }
}
