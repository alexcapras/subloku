import { Component, Input } from '@angular/core';
import { Shape } from '../../models/shape';
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
        // TODO: don't assume 0 minimum
        const limits = shape.getLimits();
        this.rows = limits.yLimits.max + 1;
        this.cols = limits.xLimits.max + 1;
        this.filled = Utils.createGrid<boolean>(this.cols, this.rows, false);
        shape.points.forEach(
            ({ colIdx, rowIdx }) => (this.filled[colIdx][rowIdx] = true)
        );
    }

    rows: number;
    cols: number;
    filled: boolean[][];
}
