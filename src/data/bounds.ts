import { Point } from './../data/point';

export class Bounds {
    top: number;
    left: number;
    bottom: number;
    right: number;

    contains(point: Point): boolean {
        return (point.x >= this.left && point.x <= this.right
                && point.y >= this.top && point.y <= this.bottom);
    }
}