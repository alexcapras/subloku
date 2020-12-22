import { Component, Input, OnInit } from '@angular/core';
import { Shape } from '../../models/models';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-shape',
    templateUrl: './shape.component.html',
    styleUrls: ['./shape.component.scss'],
})
export class ShapeComponent implements OnInit {
    @Input()
    set shape(shape: Shape) {
        this.rows = Math.max(...shape.points.map(point => point.rowIdx)) + 1;
        console.log('rows=', this.rows);
        this.cols = Math.max(...shape.points.map(point => point.colIdx)) + 1;
        console.log('cols=', this.cols);

        this.filled = Utils.createGrid<boolean>(this.cols, this.rows, false);
        console.log('filled=', this.filled);

        shape.points.forEach(
            ({ colIdx, rowIdx }) => (this.filled[colIdx][rowIdx] = true)
        );
    }

    rows: number;
    cols: number;
    filled: boolean[][];

    constructor() {}

    ngOnInit() {}
}
