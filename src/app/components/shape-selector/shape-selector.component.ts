import { Component, Input } from '@angular/core';
import { shapes } from 'src/app/utils/shapes';
import { Utils } from '../../utils/utils';
import { GameBoard } from '../../models/game-board';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Vector } from '../../models/vector';
import { Shape } from '../../models/shape';
import * as constants from '../../utils/constants';
import { ShapeQueueItem } from '../../models/shape-queue';
import { Game } from '../../models/game';

@Component({
    selector: 'app-shape-selector',
    templateUrl: './shape-selector.component.html',
    styleUrls: ['./shape-selector.component.scss'],
})
export class ShapeSelectorComponent {
    private readonly marginPx = 20;

    private dragShape: Shape;
    private dragShapeIndex: number;
    private dragPoint: Vector;

    @Input()
    mousePosition: Vector = new Vector(0, 0);

    @Input()
    boardPosition: Vector;

    @Input()
    game: Game;

    get shapeStyle() {
        return {
            margin: `${this.marginPx}px`,
        };
    }

    private get relativeMousePosition(): Vector {
        return this.mousePosition.subtract(this.boardPosition);
    }

    private get relativeMousePoint() {
        return this.relativeMousePosition
            .subtract(new Vector(constants.OFFSET, constants.OFFSET))
            .scaleDown(constants.SQUARE_SIZE)
            .round()
            .subtract(this.dragPoint);
    }

    private get pointsToFill() {
        return this.dragShape.translateBy(this.relativeMousePoint).points;
    }

    onDragDropped(event: CdkDragDrop<Shape>) {
        this.game.fillPoints(this.pointsToFill, this.dragShapeIndex);
        this.dragPoint = null;
        this.dragShape = null;
        this.dragShapeIndex = null;
    }

    onDragMoved(event: CdkDragMove<{ shape: Shape; index: number }>) {
        this.game.board.hover(this.pointsToFill);
    }

    onDragStarted(
        dragStartEvent: CdkDragStart<{ shape: Shape; index: number }>
    ) {
        this.dragShape = dragStartEvent.source.data.shape;
        this.dragShapeIndex = dragStartEvent.source.data.index;

        const dragElement = dragStartEvent.source.element.nativeElement;
        const { left: x, top: y } = dragElement.getBoundingClientRect();
        const shapeLimits = this.dragShape.getLimits();
        const dragPosition = this.mousePosition.subtract(new Vector(x, y));
        const dragPointRaw = dragPosition
            .subtract(new Vector(constants.OFFSET, constants.OFFSET))
            .scaleDown(constants.SQUARE_SIZE)
            .round();

        this.dragPoint = new Vector(
            Utils.withinLimits(
                dragPointRaw.x,
                shapeLimits.xLimits.min,
                shapeLimits.xLimits.max
            ),
            Utils.withinLimits(
                dragPointRaw.y,
                shapeLimits.yLimits.min,
                shapeLimits.yLimits.max
            )
        );
    }

    getShapeColor(item: ShapeQueueItem) {
        return item.canPlace ? 'rgb(0,0,255, 0.8)' : 'rgb(100,100,255, 0.4)';
    }
}
