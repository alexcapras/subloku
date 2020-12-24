import { Component, Input } from '@angular/core';
import { shapes } from 'src/app/utils/shapes';
import { Utils } from '../../utils/utils';
import { GameBoard } from '../../models/game-board';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Point } from '../../models/point';
import { Shape } from '../../models/shape';
import * as constants from '../../utils/constants';

@Component({
    selector: 'app-shape-selector',
    templateUrl: './shape-selector.component.html',
    styleUrls: ['./shape-selector.component.scss'],
})
export class ShapeSelectorComponent {
    private readonly marginPx = 20;

    private dragShape: Shape;
    private dragPoint: Point;

    shapes: Shape[] = [...shapes, ...shapes.map(shape => shape.rotate90n(1))];

    @Input()
    mousePosition: Point = new Point(0, 0);

    @Input()
    boardPosition: Point;

    @Input()
    game: GameBoard;

    get shapeStyle() {
        return {
            margin: `${this.marginPx}px`,
        };
    }

    private get relativeMousePosition(): Point {
        return this.mousePosition.subtract(this.boardPosition);
    }

    private get relativeMousePoint() {
        return this.relativeMousePosition
            .subtract(new Point(constants.OFFSET, constants.OFFSET))
            .scaleDown(constants.SQUARE_SIZE)
            .round()
            .subtract(this.dragPoint);
    }

    private get pointsToFill() {
        return this.dragShape.translateBy(this.relativeMousePoint).points;
    }

    onDragDropped(event: CdkDragDrop<Shape>) {
        this.game.fill(this.pointsToFill);
        this.dragPoint = null;
        this.dragShape = null;
    }

    onDragMoved(event: CdkDragMove<Shape>) {
        this.game.hover(this.pointsToFill);
    }

    onDragStarted(dragStartEvent: CdkDragStart<Shape>) {
        this.dragShape = dragStartEvent.source.data;

        const dragElement = dragStartEvent.source.element.nativeElement;
        const { left: x, top: y } = dragElement.getBoundingClientRect();
        const shapeLimits = this.dragShape.getLimits();
        const dragPosition = this.mousePosition.subtract(new Point(x, y));
        const dragPointRaw = dragPosition
            .subtract(new Point(constants.OFFSET, constants.OFFSET))
            .scaleDown(constants.SQUARE_SIZE)
            .round();

        console.log('shapeLimits', shapeLimits);
        this.dragPoint = new Point(
            Utils.withinLimits(
                dragPointRaw.colIdx,
                shapeLimits.xLimits.min,
                shapeLimits.xLimits.max
            ),
            Utils.withinLimits(
                dragPointRaw.rowIdx,
                shapeLimits.yLimits.min,
                shapeLimits.yLimits.max
            )
        );
        console.log('mousePos:', this.mousePosition);
        console.log('anchorPos:', { x, y });
        console.log('dragPosition:', dragPosition);
        console.log('dragPointRaw:', dragPointRaw);
        console.log('dragPoint:', this.dragPoint);
    }
}
