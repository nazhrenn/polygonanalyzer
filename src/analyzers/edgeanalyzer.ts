import { Polygon } from './../data/polygon';
import { LinkedList } from './../utils/linkedlist';
import { Edge } from './../data/edge';
import { Point } from './../data/point';

export class EdgeAnalyzer {

    analyze(samplePointSet: Point[]): Polygon {
        let edges: LinkedList<Edge> = new LinkedList<Edge>();
        for (let i = 0; i < samplePointSet.length; i++) {
            let start: Point = samplePointSet[i];

            let end: Point;
            if (i == samplePointSet.length - 1) {
                end = samplePointSet[0];
            } else {
                end = samplePointSet[i + 1];
            }

            let edge: Edge = new Edge(start, end);
            edges.add(edge);
        }

        let polygon: Polygon = new Polygon();
        let polygonIntersections: Map<string, Point> = new Map<string, Point>();

        let edge: Edge = edges.moveNext();
        while (edge != null) {
            let isIntersected: boolean = false;
            let intersections: Map<string, Point> = new Map<string, Point>();

            for (let j = edges.Items.length - 1; j >= 0; j--) {
                let compare: Edge = edges.Items[j];

                if (compare !== edge && compare != edges.PreviousItem && compare != edges.NextItem) {
                    let intersection: Point = this.checkIntersection(edge, compare);

                    if (intersection != null &&
                        (intersection.equals(edge.start) || intersection.equals(edge.end))) {
                        // not concerned about the endpoints.
                        intersection = null;
                    }

                    if (intersection != null && edge.contains(intersection)
                        && !intersections.has(intersection.toString())) {
                        intersections.set(intersection.toString(), intersection);
                    }
                }
            }

            if (intersections.size > 0) {
                let start: Point = edge.start;
                let end: Point = edge.end;
                let previous: Point = null;
                let edgeCount: number = 0;
                for (let intersection of intersections.values()) {
                    if (edgeCount == 0) {
                        polygon.addEdge(new Edge(start, intersection));
                    } else if (edgeCount < intersections.size) {
                        polygon.addEdge(new Edge(previous, intersection));
                    }

                    if (!polygonIntersections.has(intersection.toString())) {
                        polygonIntersections.set(intersection.toString(), intersection);
                    }

                    previous = intersection;
                    edgeCount++;
                }

                polygon.addEdge(new Edge(previous, end));
            }
            else {
                polygon.addEdge(edge);
            }

            edge = edges.moveNext();

            if (edge == edges.FirstItem) {
                break;
            }
        }

        for (let intersection of polygonIntersections.values()) {
            polygon.intersections.add(intersection);
        }

        return polygon;
    }

    checkIntersection(one: Edge, two: Edge): Point {
        let x12: number = one.start.x - one.end.x;
        let x34: number = two.start.x - two.end.x;
        let y12: number = one.start.y - one.end.y;
        let y34: number = two.start.y - two.end.y;

        let c: number = x12 * y34 - y12 * x34;

        if (Math.abs(c) >= 0.01) {
            let a: number = one.start.x * one.end.y - one.start.y * one.end.x;
            let b: number = two.start.x * two.end.y - two.start.y * two.end.x;

            let x: number = (a * x34 - b * x12) / c;
            let y: number = (a * y34 - b * y12) / c;

            let intersection: Point = new Point(x, y);
            if (one.contains(intersection) && two.contains(intersection)) {
                return intersection;
            }
        }

        return null;
    }
}