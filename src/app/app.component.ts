import { Component } from '@angular/core';
import { Shape } from './models/models';
import { shapes } from './utils/shapes';
import { Transformers } from './utils/transformations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    rows = 3;
    cols = 3;
    shapes: Shape[] = shapes;
    shapes1: Shape[] = shapes.map(Transformers.rotate90n(1));
    shapes2: Shape[] = shapes.map(Transformers.rotate90n(2));
    shapes3: Shape[] = shapes.map(Transformers.rotate90n(3));

    incrRows(incr) {
        this.rows = this.incrSafe(this.rows, incr);
    }

    incrCols(incr) {
        this.cols = this.incrSafe(this.cols, incr);
    }

    private incrSafe(init: number, incr: number) {
        const result = init + incr;
        return result < 0 ? 0 : result;
    }
}
