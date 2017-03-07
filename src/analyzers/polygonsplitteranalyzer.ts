

import { Polygon } from "../data/polygon";
import { Edge } from "../data/edge";

export class PolygonSplitterAnalyzer {
    analyze(polygon: Polygon): Polygon[] {
        var polygons: Polygon[] = [];
        var seekPolygon = polygon;

        for (var intersection of polygon.intersections) {
            seekPolygon.edges.reset();

            var addSmallPolygon: boolean = false;
            var startingEdge: Edge = seekPolygon.edges.CurrentItem;

            var edge: Edge = seekPolygon.edges.moveNext();
            while (edge != null) {
                edge = seekPolygon.edges.moveNext();

                if (edge.start.equals(intersection)) {
                    addSmallPolygon = true;
                    break;
                }

                if (edge == startingEdge) {
                    break;
                }
            }

            if (addSmallPolygon) {
                var detectedEdge: Edge = seekPolygon.edges.CurrentItem;

                var smallPolygon: Polygon = new Polygon();

                smallPolygon.addEdge(seekPolygon.edges.CurrentItem);
                seekPolygon.edges.moveNext();

                while (!polygon.edges.CurrentItem.start.equals(intersection)) {
                    smallPolygon.addEdge(seekPolygon.edges.CurrentItem);
                    seekPolygon.edges.moveNext();
                }

                var secondPolygon: Polygon = new Polygon();

                secondPolygon.addEdge(polygon.edges.CurrentItem);
                polygon.edges.moveNext();

                while (!polygon.edges.CurrentItem.equals(detectedEdge)) {
                    secondPolygon.addEdge(polygon.edges.CurrentItem);
                    polygon.edges.moveNext();
                }

                polygons.push(smallPolygon);
                seekPolygon = secondPolygon;
            }
        }

        polygons.push(seekPolygon);

        return polygons;
    }
}