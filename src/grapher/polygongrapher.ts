
import { Bounds } from "./../data/bounds";
import { Point } from './../data/point';
import { DataSet } from "./../utils/dataset";
import { PlotGraph } from "./../display/plotgraph";
import { Polygon } from "./../data/polygon";
import "../utils/array.extensions";

export default function graphPoints(bounds: Bounds, colors: string[], ...polygons: Polygon[]) {
    let graph: PlotGraph = new PlotGraph(bounds.top - 0.05, bounds.left - 0.05, bounds.bottom + 0.05, bounds.right + 0.05);

    for (let polygon of polygons) {

        if (colors != null && colors.length > 0) {
            let color = colors.popRandom();
            graph.setColor(color);
        }

        graph.polygon(polygon, true);

        graph.setColor("#777777");

        for (let intersection of polygon.intersections) {
            graph.circle(intersection, 5);
        }
    }
}