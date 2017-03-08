import { Edge } from './edge';
import { LinkedList } from "../utils/linkedlist";
import { Point } from "./point";
import { Bounds } from "./bounds";


export class Polygon {
    edges: LinkedList<Edge> = new LinkedList<Edge>();

    intersections: Set<Point> = new Set<Point>();

    addEdge(edge: Edge) {
        this.edges.add(edge);
    }

    toString(): string {
        var output: String[] = [];
        for (var edge of this.edges.Items) {
            output.push(edge.toString());
        }

        return `${this.edges.Items.length} sides. ${this.getEdgeTotal()} ET, ${this.isClockwise() ? 'cw' : 'ccw'}. ${output.join(";")}`;
    }

    reverse(): Polygon {
        var reversed: Polygon = new Polygon();

        for (var edge of this.edges.Items) {
            reversed.addEdge(edge.reverse());
        }

        return reversed;
    }

    reverseOrder(): Polygon {
        var reversed: Polygon = new Polygon();

        for (var i = this.edges.Items.length - 1; i >= 0; i--) {
            reversed.addEdge(this.edges.Items[i]);
        }

        return reversed;
    }

    public isClockwise(): boolean {
        return this.getEdgeTotal() > 0;
    }

    has(point: Point): boolean {
        for (var edge of this.edges.Items) {
            if (edge.start.equals(point) || edge.end.equals(point)) {
                return true;
            }
        }

        return false;
    }

    getEdgeTotal(): number {
        var edgeTotal = 0;

        for (var edge of this.edges.Items) {
            edgeTotal += edge.getEdgeTotal();
        }

        return edgeTotal;
    }

    bounds(): Bounds {
        var details: Bounds = new Bounds();

        var top: number = 0;
        var bottom: number = 0;
        var left: number = 0;
        var right: number = 0;

        var pointCount: number = 0;

        for (var edge of this.edges.Items) {
            for (var pointData of [edge.start, edge.end]) {
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