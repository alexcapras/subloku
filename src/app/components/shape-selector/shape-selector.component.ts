import { Component, Input } from '@angular/core';
import { Point, Position, Shape } from '../../models/models';
import { Transformers } from '../../utils/transformations';
import { shapes } from 'src/app/utils/shapes';
import { Utils } from '../../utils/utils';
import { GameBoard } from '../../models/game-board';
import { BehaviorSubject } from 'rxjs';
import { CdkDragDrop, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-shape-selector',
    templateUrl: './shape-selector.component.html',
    styleUrls: ['./shape-selector.component.scss'],
})
export class ShapeSelectorComponent {
    private readonly marginPx = 20;

    private dragShape: Shape;
    private dragPoint: Point;

    shapes: Shape[] = [...shapes, ...shapes.map(Transformers.rotate90n(1))];

    @Input()
    mousePositionSubject: BehaviorSubject<Position> = new BehaviorSubject({
        x: 0,
        y: 0,
    });

    @Input()
    boardPosition: Position;

    @Input()
    game: GameBoard;

    get shapeStyle() {
        return {
            margin: `${this.marginPx}px`,
        };
    }

    private get relativeMousePosition() {
        return Transformers.translatePosition(
            this.mousePositionSubject.getValue(),
            this.boardPosition
        );
    }

    private get relativeMousePoint() {
        return Transformers.relative(
            Utils.mapPositionToPoint(this.relativeMousePosition),
            this.dragPoint
        );
    }

    private get pointsToFill() {
        return Transformers.translate(this.dragShape, this.relativeMousePoint)
            .points;
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
        const { left, top } = dragElement.getBoundingClientRect();
        const shapeLimits = Utils.shapeLimits(this.dragShape);
        const dragPosition = Utils.calcRelativePosition(
            this.mousePositionSubject.getValue(),
            {
                x: left, // - this.marginPx,
                y: top, // - this.marginPx,
            }
        );
        const dragPointRaw = Utils.mapPositionToPoint(dragPosition);
        this.dragPoint = {
            rowIdx: Utils.withinLimits(
                dragPointRaw.rowIdx,
                shapeLimits.row.min,
                shapeLimits.row.max
            ),
            colIdx: Utils.withinLimits(
                dragPointRaw.colIdx,
                shapeLimits.col.min,
                shapeLimits.col.max
            ),
        };
        console.log('mousePos:', this.mousePositionSubject.getValue());
        console.log('anchorPos:', { left, top });
        console.log('dragPosition:', dragPosition);
        console.log('dragPointRaw:', dragPointRaw);
        console.log('dragPoint:', this.dragPoint);
    }
}
