import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
    selector: 'app-main-grid',
    templateUrl: './main-grid.component.html',
    styleUrls: ['./main-grid.component.scss'],
})
export class MainGridComponent implements OnInit {
    @Input()
    game: Game;

    constructor() {}

    ngOnInit() {}
}
