

import { Polygon } from "../data/polygon";
import { Edge } from "../data/edge";
import { Point } from "../data/point";
import "../utils/array.extensions";

export class PolygonSplitter {
    analyze(inputPolygon: Polygon): Polygon[] {
        let seekPolygons = [inputPolygon];

        for (let intersection of inputPolygon.intersections) {
            let polygons: Polygon[] = [];
            for (let seekPolygon of seekPolygons) {
                polygons.push(...this.recursiveSplit(seekPolygon, intersection));
            }

            seekPolygons = polygons;
        }

        for (let i = 0; i < seekPolygons.length; i++) {
            if (!seekPolygons[i].isClockwise()) {
                seekPolygons[i] = seekPolygons[i].reverseOrder().reverse();
            }
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

            polygon.edges.find(c => c.end.equals(intersection));
            let startingEdge: Edge = polygon.edges.CurrentItem;

            let firstPolygon: Polygon = new Polygon();

            firstPolygon.addEdge(startingEdge);
            while (!polygon.edges.CurrentItem.start.equals(intersection)) {
                firstPolygon.addEdge(polygon.edges.movePrevious());
            }

            firstPolygon = firstPolygon.reverse();

            let secondPolygon: Polygon = new Polygon();
            while (!polygon.edges.CurrentItem.equals(startingEdge)) {
                let edgeToAdd: Edge = polygon.edges.movePrevious();
                if (!edgeToAdd.equals(startingEdge)) {
                    secondPolygon.addEdge(edgeToAdd);
                }
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