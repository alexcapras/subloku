import { Component } from '@angular/core';
import { Shape } from './models/models';
import { shapes } from './utils/shapes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    rows = 3;
    cols = 3;
    shapes: Shape[] = shapes;

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
