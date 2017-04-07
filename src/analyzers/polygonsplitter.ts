

import { Polygon } from "../data/polygon";
import { Edge } from "../data/edge";
import { Point } from "../data/point";
import "../utils/array.extensions";

export class PolygonSplitter {
    analyze(polygon: Polygon): Polygon[] {
        let seekPolygons = [polygon];

        for (let intersection of polygon.intersections) {
            let polygons: Polygon[] = [];
            for (let polygon of seekPolygons) {
                let splitPolygons: Polygon[] = this.recursiveSplit(polygon, intersection);

                for (let i = 0; i < splitPolygons.length; i++) {
                    if (!splitPolygons[i].isClockwise()) {
                        splitPolygons[i] = splitPolygons[i].reverseOrder().reverse();
                    }
                }

                polygons.push(...splitPolygons);
            }

            seekPolygons = polygons;
        }

        return seekPolygons;
    }

    private recursiveSplit(polygon: Polygon, intersection: Point): Polygon[] {
        let numberOfEdgesOnPoint = 0;
        for (let edge of polygon.edges.Items) {
            if (edge.start.equals(intersection) || edge.end.equals(intersection))
                numberOfEdgesOnPoint++;
        }

        let splitPolygons: Polygon[] = [];
        if (numberOfEdgesOnPoint > 2) {
            polygon.edges.reset();

            let startingEdge: Edge;
            while (!polygon.edges.CurrentItem.end.equals(intersection)) {
                polygon.edges.moveNext();
            }
            startingEdge = polygon.edges.CurrentItem;

            let firstPolygon: Polygon = new Polygon();

            firstPolygon.addEdge(startingEdge);
            while (!polygon.edges.CurrentItem.start.equals(intersection)) {
                firstPolygon.addEdge(polygon.edges.movePrevious());
            }

            firstPolygon = firstPolygon.reverse();

            let secondPolygon: Polygon = new Polygon();
            while (!polygon.edges.CurrentItem.equals(startingEdge)) {
                secondPolygon.addEdge(polygon.edges.movePrevious());
            }

            secondPolygon = secondPolygon.reverse();

            if (firstPolygon.edges.Items.length > 2) {
                splitPolygons.push(...this.recursiveSplit(firstPolygon, intersection));
            }
            if (secondPolygon.edges.Items.length > 2) {
                splitPolygons.push(...this.recursiveSplit(secondPolygon, intersection));
            }
        } else {
            splitPolygons = [polygon];
        }

        return splitPolygons;
    }
}