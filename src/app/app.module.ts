import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GameComponent } from './components/game/game.component';
import { ShapeSelectorComponent } from './components/shape-selector/shape-selector.component';
import { ShapeComponent } from './components/shape/shape.component';
import { GridMinorComponent } from './components/grid-minor/grid-minor.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    ShapeSelectorComponent,
    ShapeComponent,
    GridMinorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
