
import { Bounds } from "./../data/bounds";
import { Point } from './../data/point';
import { DataSet } from "./../utils/dataset";
import { PlotGraph } from "./../display/plotgraph";
import { Polygon } from "./../data/polygon";

export default function graphPoints(bounds: Bounds, polygon: Polygon, color: string) {

    let graph: PlotGraph = new PlotGraph(bounds.top - 0.05, bounds.left - 0.05, bounds.bottom + 0.05, bounds.right + 0.05);

    if (color != null)
        graph.setColor(color);

    graph.polygon(polygon, true);

    graph.setColor("green");
    var intersections = polygon.intersections.values();

    for (var intersection of intersections) {
        graph.circle(intersection, 5);
    }
}