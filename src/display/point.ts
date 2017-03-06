
export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toString(): string {
        return `(${this.x},${this.y})`;
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