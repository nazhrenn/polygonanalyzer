
export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x == -0 ? 0 : x;
        this.y = y == -0 ? 0 : y;
    }

    public toString(): string {
        return `(${this.x},${this.y})`;
    }

    public equals(other: Point): boolean {
        return (this.x == other.x && this.y == other.y);
    }

    public translate(dx: number, dy: number) {
        this.x -= dx;
        this.y -= dy;
    }

    public scale(sx: number, sy: number) {
        this.x *= sx;
        this.y *= sy;
    }
}