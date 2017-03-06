import { BoundsAnalyzer } from './../analyzers/boundsanalyzer';
import { Bounds } from './../analyzers/bounds';
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
        debugger;
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

    public toString(): string {
        return `${this.start}:${this.end}`;
    }
}