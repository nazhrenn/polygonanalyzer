import { Polygon } from './../data/polygon';
import { LinkedList } from './../utils/linkedlist';
import { Edge } from './../data/edge';
import { Point } from './../data/point';

export class EdgeAnalyzer {

    analyze(samplePointSet: Point[]): Polygon {
        var edges: LinkedList<Edge> = new LinkedList<Edge>();
        for (var i = 0; i < samplePointSet.length; i++) {
            var start: Point = samplePointSet[i];

            var end: Point;
            if (i == samplePointSet.length - 1) {
                end = samplePointSet[0];
            } else {
                end = samplePointSet[i + 1];
            }

            var edge: Edge = new Edge(start, end);
            edges.add(edge);
        }

        var polygon: Polygon = new Polygon();
        var polygonIntersections: Map<string, Point> = new Map<string, Point>();

        var edge: Edge = edges.moveNext();
        while (edge != null) {
            var isIntersected: boolean = false;
            var intersections: Map<string, Point> = new Map<string, Point>();

            for (var j = edges.Items.length - 1; j >= 0; j--) {
                var compare: Edge = edges.Items[j];

                if (compare !== edge && compare != edges.PreviousItem && compare != edges.NextItem) {
                    var intersection: Point = this.checkIntersection(edge, compare);

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
                var start: Point = edge.start;
                var end: Point = edge.end;
                var previous: Point = null;
                var edgeCount: number = 0;
                for (var intersection of intersections.values()) {
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

        for (var intersection of polygonIntersections.values()) {
            polygon.intersections.add(intersection);
        }

        return polygon;
    }

    checkIntersection(one: Edge, two: Edge): Point {
        var x12: number = one.start.x - one.end.x;
        var x34: number = two.start.x - two.end.x;
        var y12: number = one.start.y - one.end.y;
        var y34: number = two.start.y - two.end.y;

        var c: number = x12 * y34 - y12 * x34;

        if (Math.abs(c) >= 0.01) {
            var a: number = one.start.x * one.end.y - one.start.y * one.end.x;
            var b: number = two.start.x * two.end.y - two.start.y * two.end.x;

            var x: number = (a * x34 - b * x12) / c;
            var y: number = (a * y34 - b * y12) / c;

            var intersection: Point = new Point(x, y);
            if (one.contains(intersection) && two.contains(intersection)) {
                return intersection;
            }
        }

        return null;
    }
}