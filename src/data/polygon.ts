import { Edge } from './edge';
import { LinkedList } from "../utils/linkedlist";
import { Point } from "./point";


export class Polygon {
    edges: LinkedList<Edge> = new LinkedList<Edge>();

    intersections: Set<Point> = new Set<Point>();

    addEdge(edge: Edge) {
        this.edges.add(edge);
    }

    toString() : string {
        var output : String[] = [];
        for (var edge of this.edges.Items) {
            output.push(edge.toString());
        }

        return `${this.edges.Items.length} sides.  ${output.join(";")}`;
    }
}