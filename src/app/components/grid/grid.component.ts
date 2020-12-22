import { Component, Input } from '@angular/core';
import { Utils } from '../../utils/utils';
import { transition, trigger, useAnimation } from '@angular/animations';
import { emptyFillAnimation } from '../../animations/empty-fill.animation';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    animations: [
        trigger('emptyFill', [
            transition('filled => empty', [useAnimation(emptyFillAnimation)]),
        ]),
    ],
})
export class GridComponent {
    // tslint:disable:variable-name
    private _rowIndices: number[];
    private _colIndices: number[];

    @Input()
    showAllBorders = false; // if true, all borders are coloured, otherwise only the borders for filled cells are shown

    @Input()
    cellSize = '5vw';

    @Input()
    cellBorderWidth = '0.2vw';

    @Input()
    cellMargin = '0.1vw';

    // debug utility to display col and row index in the div component
    @Input()
    showIndices: boolean;

    @Input()
    filled: boolean[][];

    @Input()
    hovered: boolean[][];

    @Input()
    emptyColour = 'transparent';

    @Input()
    filledColour = 'green';

    @Input()
    hoverColour = 'lightgrey';

    @Input()
    borderColour = 'grey';

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
                ? this.borderColour
                : 'transparent';
        return {
            width: cellSizeAdjusted,
            height: cellSizeAdjusted,
            background: this.isFilled(colIdx, rowIdx)
                ? this.filledColour
                : this.isHovered(colIdx, rowIdx)
                ? this.hoverColour
                : this.emptyColour,
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

    getCellState(colIdx: number, rowIdx: number) {
        return this.isFilled(colIdx, rowIdx) ? 'filled' : 'empty';
    }

    private isFilled(colIdx: number, rowIdx: number) {
        return Utils.getOrDefault<boolean>(this.filled, colIdx, rowIdx, false);
    }

    private isHovered(colIdx: number, rowIdx: number) {
        return Utils.getOrDefault<boolean>(this.hovered, colIdx, rowIdx, false);
    }
}
