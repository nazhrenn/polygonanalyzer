
import { Bounds } from './bounds';
import { Point } from './point';

export class Edge {
    start: Point;
    end: Point;

    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }

    bounds(): Bounds {
        var details: Bounds = new Bounds();

        var top: number = 0;
        var bottom: number = 0;
        var left: number = 0;
        var right: number = 0;

        var pointCount: number = 0;

        for (var pointData of [this.start, this.end]) {
            if (pointCount == 0) {
                left = pointData.x;
                right = pointData.x;
                top = pointData.y;
                bottom = pointData.y;
            } else {
                if (pointData.x < left) {
                    left = pointData.x;
                }
                if (pointData.x > right) {
                    right = pointData.x;
                }
                if (pointData.y < top) {
                    top = pointData.y;
                }
                if (pointData.y > bottom) {
                    bottom = pointData.y;
                }
            }
            pointCount++;
        }

        details.top = top;
        details.bottom = bottom;
        details.left = left;
        details.right = right;

        return details;
    }

    contains(point: Point): boolean {
        return this.bounds().contains(point);
    }

    static split(edge: Edge, point: Point): Edge[] {
        if (edge.contains(point)) {
            var first: Edge = new Edge(edge.start, point);
            var second: Edge = new Edge(point, edge.end);

            return [first, second];
        }

        return [edge];
    }

    equals(edge: Edge): boolean {
        return edge.start.equals(this.start) && edge.end.equals(this.end);
    }

    compare(edge: Edge): number {
        if (this.equals(edge)) {
            return 1;
        } else if (this.reverse().equals(edge)) {
            return -1;
        } else {
            return 0;
        }
    }

    reverse(): Edge {
        return new Edge(this.end, this.start);
    }

    getEdgeTotal(): number {
        return (this.start.x - this.end.x) * (this.start.y + this.end.y);
    }

    public toString(): string {
        return `${this.start}:${this.end}`;
    }
}