export interface Point {
  xIndex: number;
  yIndex: number;
}

export interface Shape {
  coordinates: Point[];
}

export const shapes: Shape[] = [
  {
    coordinates: [
      {xIndex: 0, yIndex: 0},
      {xIndex: 0, yIndex: 1},
    ]
  },
  {
    coordinates: [
      {xIndex: 0, yIndex: 0},
      {xIndex: 1, yIndex: 0},
    ]
  },
  {
    coordinates: [
      {xIndex: 0, yIndex: 0},
      {xIndex: 1, yIndex: 0},
      {xIndex: 0, yIndex: 1},
      {xIndex: 1, yIndex: 1},
    ]
  },
];