// usage/convention
// - Position: a Vector with real values
// - Point: a Vector with integer values
export class Vector {
    // tslint:disable-next-line:variable-name
    constructor(private _x: number, private _y: number) {}

    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    scaleUp(scale: number): Vector {
        return new Vector(this.x * scale, this.y * scale);
    }

    scaleDown(scale: number): Vector {
        return new Vector(this.x / scale, this.y / scale);
    }

    round(): Vector {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }
}
