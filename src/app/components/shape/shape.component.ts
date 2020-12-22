import { Component, Input } from '@angular/core';
import { Shape } from '../../models/models';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.scss'],
})
export class ShapeComponent {
    @Input()
    color = 'green';

    @Input()
    set shape(shape: Shape) {
        this.rows = Math.max(...shape.points.map(point => point.rowIdx)) + 1;
        this.cols = Math.max(...shape.points.map(point => point.colIdx)) + 1;
        this.filled = Utils.createGrid<boolean>(this.cols, this.rows, false);
        shape.points.forEach(
            ({ colIdx, rowIdx }) => (this.filled[colIdx][rowIdx] = true)
        );
    }

    rows: number;
    cols: number;
    filled: boolean[][];
}
