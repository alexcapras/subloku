import { Component, Input, OnInit } from '@angular/core';
import { GameBoard } from '../../models/gameBoard';

@Component({
    selector: 'app-main-grid',
    templateUrl: './main-grid.component.html',
    styleUrls: ['./main-grid.component.scss'],
})
export class MainGridComponent implements OnInit {
    @Input()
    game: GameBoard;

    constructor() {}

    ngOnInit() {}
}
