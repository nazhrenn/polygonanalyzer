

import { Polygon } from "../data/polygon";
import { Edge } from "../data/edge";
import { Point } from "../data/point";
import "../utils/array.extensions";

export class PolygonSplitterAnalyzer {
    analyze(polygon: Polygon): Polygon[] {
        var polygons: Polygon[] = [polygon];

        var seekPolygons = polygons;
        for (var intersection of polygon.intersections) {
            polygons = [];
            for (var polygon of seekPolygons) {
                var splitPolygons: Polygon[] = this.split(polygon, intersection);

                for (var i = 0; i < splitPolygons.length; i++) {
                    if (!splitPolygons[i].isClockwise()) {
                        splitPolygons[i] = splitPolygons[i].reverseOrder().reverse();
                    }
                }

                polygons.push(...splitPolygons);
            }

            seekPolygons = polygons;
        }

        return polygons;
    }

    split(polygon: Polygon, intersection: Point): Polygon[] {
        var numberOfEdgesOnPoint = 0;
        for (var edge of polygon.edges.Items) {
            if (edge.start.equals(intersection) || edge.end.equals(intersection))
                numberOfEdgesOnPoint++;
        }

        if (numberOfEdgesOnPoint > 2) {
            polygon.edges.reset();

            var startingEdge: Edge;
            while (!polygon.edges.CurrentItem.end.equals(intersection)) {
                polygon.edges.moveNext();
            }
            startingEdge = polygon.edges.CurrentItem;

            var firstPolygon: Polygon = new Polygon();

            firstPolygon.addEdge(startingEdge);
            while (!polygon.edges.CurrentItem.start.equals(intersection)) {
                polygon.edges.movePrevious();
                firstPolygon.addEdge(polygon.edges.CurrentItem);
            }

            firstPolygon = firstPolygon.reverse();
            //firstPolygon.addEdge(polygon.edges.CurrentItem);

            var secondPolygon: Polygon = new Polygon();
            while (!polygon.edges.CurrentItem.equals(startingEdge)) {
                polygon.edges.movePrevious();
                secondPolygon.addEdge(polygon.edges.CurrentItem);
            }

            secondPolygon = secondPolygon.reverse();
            //debugger;

            var splitPolygons: Polygon[] = [];
            if (firstPolygon.edges.Items.length > 2) {
                var firstSplit = this.split(firstPolygon, intersection);
                splitPolygons.push(...firstSplit);
            }
            if (secondPolygon.edges.Items.length > 2) {
                var secondSplit = this.split(secondPolygon, intersection);
                splitPolygons.push(...secondSplit);
            }



            return splitPolygons;
        } else {
            return [polygon];
        }
    }
}