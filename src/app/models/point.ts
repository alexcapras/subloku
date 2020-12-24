export class Point {
    // tslint:disable-next-line:variable-name
    constructor(private _x: number, private _y: number) {}

    get rowIdx() {
        return this._y;
    }

    get colIdx() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    public add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    public subtract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    public scaleUp(scale: number): Point {
        return new Point(this.x * scale, this.y * scale);
    }

    public scaleDown(scale: number): Point {
        return new Point(this.x / scale, this.y / scale);
    }

    public round(): Point {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }
}
