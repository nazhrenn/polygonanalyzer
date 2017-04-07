import { Assert } from './utils/assert';
import { CircularList } from './utils/circularlist';
import { Edge } from './data/edge';
import { PointTransformer } from './analyzers/pointtransformer';
import { Point } from './data/point';
import { DataSet } from './utils/dataset';
import { PointAnalyzer } from './analyzers/pointanalyzer';
import { EdgeAnalyzer } from './analyzers/edgeanalyzer';
import { Bounds } from './data/bounds';
import { Log } from './utils/log';
import { Polygon } from "./data/polygon";
import { PolygonSplitter } from "./analyzers/polygonsplitter";

import graphPoints from "./grapher/pointgrapher";
import graphPolygon from "./grapher/polygongrapher";

import samplePointSets from './pointdata'
import { PolygonCombiner } from "./analyzers/polygoncombiner";

let selectedIndex: number = samplePointSets.length > 0 ? samplePointSets.length - 1 : -1;

let previousButton: HTMLInputElement = <HTMLInputElement>document.getElementById("previous");
let nextButton: HTMLInputElement = <HTMLInputElement>document.getElementById("next");
let reverseCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("reverse");
let showBestCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("showBest");
let useCustomDataCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("useCustomData");
let customDataTextArea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("customData");

let eventHandler: (ev: Event) => any = (ev: Event): any => {
    if (selectedIndex < 0)
        selectedIndex = samplePointSets.length - 1;

    if (selectedIndex == samplePointSets.length)
        selectedIndex = 0;

    if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
        if (useCustomDataCheckbox.checked) {
            customDataTextArea.style.display = "block";
            previousButton.disabled = true;
            nextButton.disabled = true;

            analyze(parseCustomData(), reverseCheckbox.checked, showBestCheckbox.checked);
        } else {
            previousButton.disabled = false;
            nextButton.disabled = false;
            customDataTextArea.style.display = "none";

            analyze(samplePointSets[selectedIndex], reverseCheckbox.checked, showBestCheckbox.checked);
        }
    }
};

previousButton.onclick = (ev: MouseEvent): any => {
    selectedIndex--;
    eventHandler(ev);
};

nextButton.onclick = (ev: MouseEvent): any => {
    selectedIndex++;
    eventHandler(ev);
};

reverseCheckbox.onchange = eventHandler;
showBestCheckbox.onchange = eventHandler;
useCustomDataCheckbox.onchange = eventHandler;
customDataTextArea.onchange = eventHandler;
customDataTextArea.onkeyup = eventHandler;

function parseCustomData(): number[][] {
    let text = customDataTextArea.value;

    let coords = text.split(/(\(-?\d*(?:.\d*)?,-?\d*(?:.\d*)?\)),?/);

    let numbers = [];

    for (let coord of coords) {
        if (coord != null && coord != "") {
            let points = /\((-?\d*(?:.\d*)?),(-?\d*(?:.\d*)?)\)/.exec(coord);

            if (points != null) {
                numbers.push([+points[1], +points[2]]);
            }
        }
    }

    return numbers;
}

function analyze(samplePointSet: number[][], reverse: boolean, showBest: boolean) {

    if (samplePointSet != null) {
        Log.clear();

        let dataSet: DataSet<Point> = new PointAnalyzer().analyze(samplePointSet);
        let edges: CircularList<Edge> = new PointTransformer().transform(dataSet.Data);
        let polygon: Polygon = new EdgeAnalyzer().analyze(edges);
        let bounds: Bounds = polygon.bounds();

        let polygons: Polygon[] = new PolygonSplitter().analyze(polygon);
        if (showBest && polygon.intersections.size > 0) {
            polygon = new PolygonCombiner().analyze(polygons, polygon.intersections);
        }

        if (!showBest && polygons != null && polygons.length > 1) {
            let colors: string[] = ["red", "blue", "green", "black", "magenta", "#441155", "#99ff44", "#99ff11"];

            for (let p of polygons) {

                if (reverse) {
                    p = p.reverseOrder().reverse();
                }
                Log.append(`Polygon: ${p}.`);
            }

            graphPolygon(bounds, colors, ...polygons);
        } else {
            if (reverse) {
                polygon = polygon.reverseOrder().reverse();
            }

            let color: string = "red"
            if (polygon.isClockwise()) {
                color = "blue";
            }

            let finalEdges: CircularList<Edge> = polygon.edges;
            for (let i: number = 0; i < finalEdges.length; i++) {
                let currentEdge: Edge = finalEdges[i];

                let previousEdge: Edge;
                if (i == 0) {
                    previousEdge = finalEdges[finalEdges.length - 1];
                } else {
                    previousEdge = finalEdges[i - 1];
                }

                Log.append(`Edge ${i + 1}/${finalEdges.length} :: Checking start of edge matches previous edge end. :: ${Assert.isTrue(currentEdge.start.equals(previousEdge.end))}`);
            }
            Log.append(`Polygon: ${polygon}.`);
            graphPolygon(bounds, [color], polygon);
        }
    }
}

eventHandler(null);