import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GameComponent } from './components/game/game.component';
import { ShapeSelectorComponent } from './components/shape-selector/shape-selector.component';
import { ShapeComponent } from './components/shape/shape.component';
import { GridComponent } from './components/grid/grid.component';
import { MainGridComponent } from './components/main-grid/main-grid.component';
import { SvgGridComponent } from './components/svg-grid/svg-grid.component';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        GameComponent,
        ShapeSelectorComponent,
        ShapeComponent,
        GridComponent,
        MainGridComponent,
        SvgGridComponent,
    ],
    imports: [BrowserModule, BrowserAnimationsModule, DragDropModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
