
import "./../utils/array.extensions";

import { Point } from "../data/point";
import { Polygon } from "../data/polygon";
import { Log } from "../utils/log";

export class PolygonCombiner {

    analyze(polygons: Polygon[], intersections: Set<Point>): Polygon {
        let polygon: Polygon = new Polygon();
        let seekPolygons: Polygon[] = polygons.duplicate();

        if (intersections.size > 0) {
            for (let intersection of intersections) {
                let touching: Polygon[] = [];

                for (let polygon of seekPolygons) {
                    if (polygon.has(intersection)) {
                        touching.push(polygon);
                    }
                }

                let reconstituted: Polygon = new Polygon();
                if (touching.length > 1) {
                    // recombine the polygons
                    while (touching.length > 0) {
                        if (touching.length >= 2) {
                            let target: Polygon = touching.shift();
                            let working: Polygon = touching.shift();

                            target.edges.find(c => c.end.equals(intersection));
                            working.edges.find(c => c.start.equals(intersection));

                            for (let edge of working.edges) {
                                reconstituted.addEdge(edge);
                            }

                            for (let edge of target.edges) {
                                reconstituted.addEdge(edge);
                            }

                            let n: number = seekPolygons.indexOf(target);
                            if (n >= 0) {
                                seekPolygons.splice(n, 1);
                            }

                            n = seekPolygons.indexOf(working);
                            if (n >= 0) {
                                seekPolygons.splice(n, 1);
                            }
                        } else {
                            let working = touching.shift();
                            working.edges.find(c => c.start.equals(intersection));

                            for (let edge of working.edges) {
                                reconstituted.addEdge(edge);
                            }

                            let n: number = seekPolygons.indexOf(working);
                            if (n >= 0) {
                                seekPolygons.splice(n, 1);
                            }
                        }
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