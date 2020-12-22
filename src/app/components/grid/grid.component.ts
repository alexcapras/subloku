import { Component, Input } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
    // tslint:disable:variable-name
    private _rowIndices: number[];
    private _colIndices: number[];

    @Input()
    showAllBorders = false;

    @Input()
    cellSize = '5vw';

    @Input()
    cellBorderWidth = '0.2vw';

    @Input()
    cellMargin = '0.1vw';

    @Input()
    showIndices: boolean;

    @Input()
    filled: boolean[][];

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

    cellStyle(colIdx: number, rowIdx: number) {
        const cellSizeAdjusted = `calc(${this.cellSize} - 2 * (${this.cellBorderWidth} + ${this.cellMargin}))`;
        const borderColor =
            this.showAllBorders || this.isFilled(colIdx, rowIdx)
                ? 'black'
                : 'transparent';
        return {
            width: cellSizeAdjusted,
            height: cellSizeAdjusted,
            background: this.isFilled(colIdx, rowIdx) ? 'blue' : null,
            margin: this.cellMargin,
            border: `${this.cellBorderWidth} solid ${borderColor}`,
        };
    }

    rowStyle() {
        return {
            display: 'grid',
            'grid-template-columns': this._colIndices
                .map(_ => this.cellSize)
                .join(' '),
        };
    }

    private isFilled(colIdx: number, rowIdx: number) {
        if (
            !this.filled ||
            !this.filled.length ||
            colIdx < 0 ||
            colIdx >= this.filled.length ||
            rowIdx < 0 ||
            rowIdx >= this.filled[colIdx].length
        ) {
            return false;
        }

        return this.filled[colIdx][rowIdx];
    }
}
