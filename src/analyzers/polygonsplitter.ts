import { CircularList } from './../utils/circularlist';


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
        for (let edge of polygon.edges) {
            if (edge.start.equals(intersection) || edge.end.equals(intersection))
                numberOfEdgesOnPoint++;
        }

        let splitPolygons: Polygon[] = [];
        if (numberOfEdgesOnPoint > 2) {
            let edges: CircularList<Edge> = polygon.edges;

            let startingEdge: Edge = edges.find(c => c.end.equals(intersection));
            edges.setCurrentItem(startingEdge);

            let firstPolygon: Polygon = new Polygon();

            firstPolygon.addEdge(startingEdge);
            while (!edges.current.start.equals(intersection)) {
                let edgeToAdd: Edge = edges.previous();
                firstPolygon.addEdge(edgeToAdd);
            }

            firstPolygon = firstPolygon.reverseOrder();

            let secondPolygon: Polygon = new Polygon();
            while (!edges.current.equals(startingEdge)) {
                let edgeToAdd: Edge = edges.previous();
                if (!edgeToAdd.equals(startingEdge)) {
                    secondPolygon.addEdge(edgeToAdd);
                }
            }

            secondPolygon = secondPolygon.reverseOrder();

            if (firstPolygon.edges.length > 2) {
                splitPolygons.push(...this.recursiveSplit(firstPolygon, intersection));
            }
            if (secondPolygon.edges.length > 2) {
                splitPolygons.push(...this.recursiveSplit(secondPolygon, intersection));
            }
        } else {
            splitPolygons = [polygon];
        }

        return splitPolygons;
    }
}