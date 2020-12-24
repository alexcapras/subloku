import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Point } from '../../models/point';
import { GameBoard } from '../../models/game-board';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    @ViewChild('board', { static: false })
    boardElement: ElementRef<HTMLTemplateElement>;

    mousePositionSubject: BehaviorSubject<Point> = new BehaviorSubject(
        new Point(0, 0)
    );

    game: GameBoard;

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousePositionSubject.next(new Point(event.clientX, event.clientY));
    }

    ngOnInit(): void {
        this.game = new GameBoard();
    }

    get boardPosition(): Point {
        const { left: x, top: y } = !!this.boardElement
            ? this.boardElement.nativeElement.getBoundingClientRect()
            : { left: 0, top: 0 };

        return new Point(x, y);
    }
}
