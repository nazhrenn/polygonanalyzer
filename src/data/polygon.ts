import { Edge } from './edge';
import { LinkedList } from "../utils/linkedlist";
import { Point } from "./point";


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

    getEdgeTotal(): number {
        var edgeTotal = 0;

        for (var edge of this.edges.Items) {
            edgeTotal += edge.getEdgeTotal();
        }

        return edgeTotal;
    }
}