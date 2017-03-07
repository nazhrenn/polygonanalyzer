import { Edge } from './edge';
import { LinkedList } from "../utils/linkedlist";
import { Point } from "./point";


export class Polygon {
    edges: LinkedList<Edge> = new LinkedList<Edge>();

    intersections: Set<Point> = new Set<Point>();

    addEdge(edge: Edge)
    {
        this.edges.add(edge);
    }
}