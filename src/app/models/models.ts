export interface Position {
  x: number;
  y: number;
}

export interface Square {
  width: number;
  height: number;
  xIndex: number;
  yIndex: number;
  xPos: number;
  yPos: number;
}

export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Point {
  xIndex: number;
  yIndex: number;
}

export interface Shape {
  coordinates: Point[];
}
