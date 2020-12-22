import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { BehaviorSubject } from 'rxjs';
import { Point, Position } from '../../models/models';
import { Utils } from '../../utils/utils';
import { Game } from '../../models/game';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    @ViewChild('board', { static: false })
    boardElement: ElementRef<BoardComponent>;

    mousePositionSubject: BehaviorSubject<Position> = new BehaviorSubject({
        x: 0,
        y: 0,
    });

    game: Game;

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousePositionSubject.next({
            x: event.clientX,
            y: event.clientY,
        });
    }

    ngOnInit(): void {
        this.game = new Game();
    }

    onDrop() {
        const point = Utils.mapPositionToPoint(
            Utils.calcRelativePosition(
                this.mousePositionSubject.getValue(),
                this.anchorPosition
            )
        );
        console.log(point);
        this.game.fill(point);
    }

    onMove() {
        const point = Utils.mapPositionToPoint(
            Utils.calcRelativePosition(
                this.mousePositionSubject.getValue(),
                this.anchorPosition
            )
        );

        this.game.hover(point);
    }

    get anchorPosition(): Position {
        // @ts-ignore
        return this.boardElement.board.nativeElement.getBoundingClientRect();
    }
}
