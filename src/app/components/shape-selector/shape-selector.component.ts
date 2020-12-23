import { Component, Input } from '@angular/core';
import { Point, Position, Shape } from '../../models/models';
import { Transformers } from '../../utils/transformations';
import { shapes } from 'src/app/utils/shapes';
import { Utils } from '../../utils/utils';
import { Game } from '../../models/game';
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
    game: Game;

    get shapeStyle() {
        return {
            margin: `${this.marginPx}px`,
        };
    }

    get relativeMousePoint() {
        return Utils.mapPositionToPoint(this.mousePositionSubject.getValue());
    }

    onDragDropped(event: CdkDragDrop<Shape>) {
        this.game.fill(
            this.dragShape,
            Transformers.relative(this.relativeMousePoint, this.dragPoint)
        );
        this.dragPoint = null;
        this.dragShape = null;
    }

    onDragMoved(event: CdkDragMove<Shape>) {
        this.game.hover(
            this.dragShape,
            Transformers.relative(this.relativeMousePoint, this.dragPoint)
        );
    }

    onDragStarted(dragStartEvent: CdkDragStart<Shape>) {
        const dragElement = dragStartEvent.source.element.nativeElement;
        // @ts-ignore
        const { x, y } = dragElement.getBoundingClientRect();
        this.dragShape = dragStartEvent.source.data;
        this.dragPoint = Utils.mapPositionToPoint(
            Utils.calcRelativePosition(this.mousePositionSubject.getValue(), {
                x: x - this.marginPx,
                y: y - this.marginPx,
            })
        );
    }
}
