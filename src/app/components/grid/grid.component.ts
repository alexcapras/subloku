import { Component, Input, OnInit } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
    // tslint:disable:variable-name
    private _rowIndices: number[];
    private _colIndices: number[];

    @Input()
    cellSize = '5vw';

    @Input()
    showIndices: boolean;

    @Input()
    set rows(rows: number) {
        this._rowIndices = Utils.createLinearArray(rows);
    }

    @Input()
    set columns(columns: number) {
        this._colIndices = Utils.createLinearArray(columns);
    }

    get rowIndices(): number[] {
        return this._rowIndices;
    }

    get colIndices(): number[] {
        return this._colIndices;
    }

    cellStyle() {
        return {
            width: this.cellSize,
            height: this.cellSize,
        };
    }

    rowStyle() {
        return {
            'grid-template-columns': this._colIndices
                .map(_ => this.cellSize)
                .join(' '),
        };
    }

    constructor() {}

    ngOnInit() {}
}
