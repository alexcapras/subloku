import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vector } from '../../models/vector';
import { Game } from '../../models/game';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    @ViewChild('board', { static: false })
    boardElement: ElementRef<HTMLTemplateElement>;

    private readonly mousePositionSubject: BehaviorSubject<
        Vector
    > = new BehaviorSubject(new Vector(0, 0));

    game: Game;

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousePositionSubject.next(
            new Vector(event.clientX, event.clientY)
        );
    }

    ngOnInit(): void {
        this.game = new Game();
    }

    get mousePosition(): Vector {
        return this.mousePositionSubject.getValue();
    }

    get boardPosition(): Vector {
        const { left: x, top: y } = !!this.boardElement
            ? this.boardElement.nativeElement.getBoundingClientRect()
            : { left: 0, top: 0 };

        return new Vector(x, y);
    }

    onRestart() {
        this.game = new Game();
    }
}
