import { Polygon } from './../display/polygon';
import { Log } from './../utils/log';
import { LinkedList } from './../utils/linkedlist';
import { Edge } from './../display/edge';
import { Point } from './../display/point';
import { EdgeDetails } from './edgedetails';

export class EdgeAnalyzer {

    analyze(samplePointSet: Point[]): EdgeDetails {
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

        var edge: Edge = edges.moveNext();
        while (edge != null) {
            Log.append(edges.Current);
            var isIntersected: boolean = false;
            var intersections: Point[] = [];

            for (var compare of edges.Items) {
                if (compare !== edge && compare != edges.Previous && compare != edges.Next) {
                    Log.append(`Comparing ${edge} to ${compare}`);
                    var intersection: Point = this.checkIntersection(edge, compare);

                    if (intersection != null &&
                        (intersection.equals(edge.start) || intersection.equals(edge.end))) {
                        // not concerned about the endpoints.
                        intersection = null;
                    }

                    if (intersection != null && edge.contains(intersection)) {
                        intersections.push(intersection);
                    }
                }
            }

            if (intersections.length > 0) {
                var start: Point = edge.start;
                var end: Point = edge.end;
                var previous: Point = null;
                var edgeCount: number = 0;
                for (var intersection of intersections) {
                    Log.append(`<b>Intersection at ${intersection}.</b>`);

                    if (edgeCount > 0) {
                        polygon.addEdge(new Edge(start, intersection));
                    } else if (edgeCount < intersections.length - 1) {
                        polygon.addEdge(new Edge(previous, intersection));
                    } else {
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

            if (edge == edges.First) {
                debugger;
                break;
            }
        }

        Log.append(`Creating a polygon with edges:`);
        for (var edge of polygon.edges) {
            Log.append(`${edge}`);
        }

        return null;
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
            if (one.contains(intersection)) {
                return intersection;
            }
        }

        return null;
    }
}