
import { Bounds } from "./analyzers/bounds";
import { Point } from './display/point';
import { DataSet } from "./utils/dataset";
import { PlotGraph } from "./display/plotgraph";

export default function graphPoints(bounds:Bounds, dataSet: Point[], color: string) {

    if (dataSet.length < 3) {
        throw new Error("Not enough points to draw a polygon");
    }

    let graph: PlotGraph = new PlotGraph(bounds.top - 0.05, bounds.left - 0.05, bounds.bottom + 0.05, bounds.right + 0.05);

    if (color != null)
        graph.setColor(color);

    graph.polygon(dataSet, true);
}