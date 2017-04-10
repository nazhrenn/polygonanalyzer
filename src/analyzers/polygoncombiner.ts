import { Edge } from './../data/edge';
import { CircularList } from './../utils/circularlist';

import "./../utils/array.extensions";

import { Point } from "../data/point";
import { Polygon } from "../data/polygon";
import { Log } from "../utils/log";

export class PolygonCombiner {

    analyze(inputPolygons: Polygon[], intersections: Set<Point>): Polygon {
        let combinedPolygon: Polygon = new Polygon();
        let seekPolygons: Polygon[] = inputPolygons.duplicate();

        if (intersections.size > 0) {
            for (let intersection of intersections) {
                let touching: Polygon[] = [];

                for (let seekPolygon of seekPolygons) {
                    if (seekPolygon.has(intersection)) {
                        touching.push(seekPolygon);
                    }
                }

                let reconstituted: Polygon = new Polygon();
                if (touching.length > 1) {
                    // recombine the polygons
                    while (touching.length > 0) {
                        if (touching.length >= 2) {
                            let target: Polygon = touching.shift();
                            let targetEdges: CircularList<Edge> = target.edges;
                            let working: Polygon = touching.shift();
                            let workingEdges: CircularList<Edge> = working.edges;

                            let targetEdge: Edge = targetEdges.find(c => c.start.equals(intersection));
                            let workingEdge: Edge = workingEdges.find(c => c.start.equals(intersection));

                            targetEdges.setCurrentItem(targetEdge);
                            workingEdges.setCurrentItem(workingEdge);

                            reconstituted.addEdge(workingEdge);
                            let edge: Edge = workingEdges.next();
                            while (!edge.equals(workingEdge)) {
                                reconstituted.addEdge(edge);
                                edge = workingEdges.next();
                            }

                            reconstituted.addEdge(targetEdge);
                            edge = targetEdges.next();
                            while (!edge.equals(targetEdge)) {
                                reconstituted.addEdge(edge);
                                edge = targetEdges.next();
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
                            let workingEdges: CircularList<Edge> = working.edges;
                            let workingEdge: Edge = workingEdges.find(c => c.start.equals(intersection));

                            workingEdges.setCurrentItem(workingEdge);

                            reconstituted.addEdge(workingEdge);
                            let edge: Edge = workingEdges.next();
                            while (!edge.equals(workingEdge)) {
                                reconstituted.addEdge(edge);
                                edge = workingEdges.next();
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
                combinedPolygon = seekPolygons[0];
            }

            return combinedPolygon;
        } else {
            throw new Error("Unable to combine polygons as there are no intersections.")
        }
    }
}