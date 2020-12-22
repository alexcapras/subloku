import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shape-selector',
  templateUrl: './shape-selector.component.html',
  styleUrls: ['./shape-selector.component.scss']
})
export class ShapeSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  //
  // onDrop() {
  //   const point = this.getPointFromEvent(
  //     this.mousePositionSubject.getValue()
  //   );
  //   console.log(point);
  //   this.onSquareFilled(point);
  //   this.resetIsHovered();
  // }
  //
  // onMove() {
  //   const point = this.getPointFromEvent(
  //     this.mousePositionSubject.getValue()
  //   );
  //
  //   this.resetIsHovered();
  //   this.setHover(point);
  // }

}
