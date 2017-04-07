
import "./../utils/array.extensions";

import { Point } from "../data/point";
import { Polygon } from "../data/polygon";
import { Log } from "../utils/log";

export class PolygonCombiner {

    analyze(polygons: Polygon[], intersections: Set<Point>): Polygon {
        var polygon: Polygon = new Polygon();
        var seekPolygons: Polygon[] = polygons.duplicate();

        if (intersections.size > 0) {
            for (var intersection of intersections) {
                var touching: Polygon[] = [];

                for (var polygon of seekPolygons) {
                    if (polygon.has(intersection)) {
                        touching.push(polygon);
                    }
                }

                var reconstituted: Polygon = new Polygon();
                if (touching.length > 1) {
                    // recombine the polygons
                    while (touching.length > 0) {
                        if (touching.length >= 2) {
                            var target: Polygon = touching.shift();
                            var working: Polygon = touching.shift();

                            target.edges.find(c => c.end.equals(intersection));
                            working.edges.find(c => c.start.equals(intersection));

                            for (var edge of working.edges) {
                                reconstituted.addEdge(edge);
                            }

                            for (var edge of target.edges) {
                                reconstituted.addEdge(edge);
                            }

                            var n: number = seekPolygons.indexOf(target);
                            if (n >= 0) {
                                seekPolygons.splice(n, 1);
                            }

                            n = seekPolygons.indexOf(working);
                            if (n >= 0) {
                                seekPolygons.splice(n, 1);
                            }
                        } else {
                            var working = touching.shift();
                            working.edges.find(c => c.start.equals(intersection));

                            for (var edge of working.edges) {
                                reconstituted.addEdge(edge);
                            }

                            var n: number = seekPolygons.indexOf(working);
                            if (n >= 0) {
                                seekPolygons.splice(n, 1);
                            }
                        }
                    }

                    var n: number = seekPolygons.indexOf(target);

                    if (n >= 0) {
                        seekPolygons.splice(n, 1);
                    }

                    seekPolygons.push(reconstituted);
                }
            }

            if (seekPolygons.length == 1) {
                polygon = seekPolygons[0];
            }

            return polygon;
        } else {
            throw new Error("Unable to combine polygons as there are no intersections.")
        }
    }
}