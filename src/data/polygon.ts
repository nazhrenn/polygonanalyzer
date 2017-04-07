import { CircularList } from './../utils/circularlist';
import { Edge } from './edge';
import { Point } from "./point";
import { Bounds } from "./bounds";


export class Polygon {
    edges: CircularList<Edge> = new CircularList<Edge>();

    intersections: Set<Point> = new Set<Point>();

    addEdge(edge: Edge) {
        this.edges.push(edge);
    }

    toString(): string {
        let output: String[] = [];
        for (let edge of this.edges) {
            output.push(edge.toString());
        }

        return `${this.edges.length} sides. ${this.getEdgeTotal()} ET, ${this.isClockwise() ? 'cw' : 'ccw'}. ${output.join(";")}`;
    }

    reverse(): Polygon {
        let reversed: Polygon = new Polygon();

        for (let edge of this.edges) {
            reversed.addEdge(edge.reverse());
        }

        return reversed;
    }

    reverseOrder(): Polygon {
        let reversed: Polygon = new Polygon();

        for (let i = this.edges.length - 1; i >= 0; i--) {
            reversed.addEdge(this.edges[i]);
        }

        return reversed;
    }

    public isClockwise(): boolean {
        return this.getEdgeTotal() > 0;
    }

    has(point: Point): boolean {
        for (let edge of this.edges) {
            if (edge.start.equals(point) || edge.end.equals(point)) {
                return true;
            }
        }

        return false;
    }

    getEdgeTotal(): number {
        let edgeTotal = 0;

        for (let edge of this.edges) {
            edgeTotal += edge.getEdgeTotal();
        }

        return edgeTotal;
    }

    bounds(): Bounds {
        let details: Bounds = new Bounds();

        let top: number = 0;
        let bottom: number = 0;
        let left: number = 0;
        let right: number = 0;

        let pointCount: number = 0;

        for (let edge of this.edges) {
            for (let pointData of [edge.start, edge.end]) {
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
        }

        details.top = top;
        details.bottom = bottom;
        details.left = left;
        details.right = right;

        return details;
    }
}