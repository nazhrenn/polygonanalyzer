import { BoundsAnalyzer } from './../analyzers/boundsanalyzer';
import { Bounds } from './bounds';
import { Point } from './point';

export class Edge {
    start: Point;
    end: Point;

    private static boundsAnalyzer: BoundsAnalyzer = new BoundsAnalyzer();

    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }

    bounds() : Bounds {
        return Edge.boundsAnalyzer.analyze([this.start, this.end]);
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

    equals(edge: Edge) : boolean {
        return edge.start.equals(this.start) && edge.end.equals(this.end);
    }

    compare(edge: Edge) : number {
        if (this.equals(edge)) {
            return 1;
        } else if (this.reverse().equals(edge)) {
            return -1;
        } else {
            return 0;
        }
    }

    reverse() : Edge {
        return new Edge(this.end, this.start);
    }

    getEdgeTotal() : number {
        return (this.start.x - this.end.x) * (this.start.y + this.end.y);
    }

    public toString(): string {
        return `${this.start}:${this.end}`;
    }
}