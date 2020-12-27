import { Component, Input, OnInit } from '@angular/core';
import { Shape } from '../../models/shape';
import * as constants from '../../utils/constants';

@Component({
    selector: 'app-svg-grid',
    templateUrl: './svg-grid.component.html',
    styleUrls: ['./svg-grid.component.scss'],
})
export class SvgGridComponent implements OnInit {
    size = constants.SQUARE_SIZE;
    marginPx = 4;
    totalWidth: number;
    totalHeight: number;

    // tslint:disable-next-line:variable-name
    private _squares: { x; y; width; height }[];

    @Input()
    color = 'blue';

    @Input()
    set shape(shape: Shape) {
        this._squares = shape.points.map(point => ({
            x: point.x * this.size + this.marginPx,
            y: point.y * this.size + this.marginPx,
            width: this.size - 2 * this.marginPx,
            height: this.size - 2 * this.marginPx,
        }));
        const limits = shape.getLimits();

        this.totalWidth =
            this.size * (1 + limits.xLimits.max - limits.xLimits.min);
        this.totalHeight =
            this.size * (1 + limits.yLimits.max - limits.yLimits.min);
    }

    get squares(): { x; y; width; height }[] {
        return this._squares;
    }

    ngOnInit() {}

    getWrapperStyle() {
        const xx = this.totalWidth / 2;
        const yy = this.totalHeight / 2;

        return {
            'transform-origin': `${xx}px ${yy}px`, // <-- this is super important!
        };
    }

    getSquareStyle(xIndex, yIndex) {
        const xx = (xIndex + 0.5) * constants.SQUARE_SIZE + constants.OFFSET;
        const yy = (yIndex + 0.5) * constants.SQUARE_SIZE + constants.OFFSET;

        return {
            // 'transform-origin': `${xx}px ${yy}px`, // <-- this is super important!
            fill: this.color,
            stroke: 'black',
            'stroke-opacity': 1,
            'stroke-width': 2.5,
        };
    }
}
