import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Position } from '../../models/models';
import { GameBoard } from '../../models/game-board';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    @ViewChild('board', { static: false })
    boardElement: ElementRef<HTMLTemplateElement>;

    mousePositionSubject: BehaviorSubject<Position> = new BehaviorSubject({
        x: 0,
        y: 0,
    });

    game: GameBoard;

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousePositionSubject.next({
            x: event.clientX,
            y: event.clientY,
        });
    }

    ngOnInit(): void {
        this.game = new GameBoard();
    }

    get boardPosition(): Position {
        const { left: x, top: y } = !!this.boardElement
            ? this.boardElement.nativeElement.getBoundingClientRect()
            : { left: 0, top: 0 };

        return {
            x,
            y,
        };
    }
}
