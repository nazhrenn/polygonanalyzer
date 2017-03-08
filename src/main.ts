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

var selectedIndex: number = samplePointSets.length > 0 ? samplePointSets.length - 1 : -1;

var previousButton: HTMLInputElement = <HTMLInputElement>document.getElementById("previous");
var nextButton: HTMLInputElement = <HTMLInputElement>document.getElementById("next");
var reverseCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("reverse");

previousButton.onclick = (ev: MouseEvent): any => {
    selectedIndex--;

    if (selectedIndex < 0)
        selectedIndex = samplePointSets.length - 1;

    if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
        analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
    }
};

nextButton.onclick = (ev: MouseEvent): any => {
    selectedIndex++;

    if (selectedIndex == samplePointSets.length)
        selectedIndex = 0;

    if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
        analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
    }
};

reverseCheckbox.onchange = (ev: Event): any => {
    if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
        analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
    }
};


if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
    analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
}

function analyze(samplePointSet: number[][], reverse: boolean) {

    Log.clear();

    var dataSet: DataSet<Point> = new PointAnalyzer().analyze(samplePointSet);

    var polygon: Polygon = new EdgeAnalyzer().analyze(dataSet.Data);
    var bounds: Bounds = polygon.bounds();
    var polygons: Polygon[] = new PolygonSplitter().analyze(polygon);

    if (polygons != null && polygons.length > 1) {
        var colors: string[] = ["red", "blue", "green", "black", "magenta", "#441155", "#99ff44", "#99ff11"];

        for (var p of polygons) {
            
            if (reverse) {
                p = p.reverseOrder().reverse();
            }
            Log.append(`Polygon: ${p}.`);
        }

        graphPolygon(bounds, colors, ...polygons);
    } else {
        var color: string = "red"
        if (polygon.isClockwise()) {
            color = "blue";
        }

        Log.append(`Polygon is <u>${polygon.isClockwise() ? "clockwise" : "counter-clockwise"}</u> with a <u>${polygon.getEdgeTotal()}</u> edge total.`);

        if (reverse) {
            polygon = polygon.reverseOrder().reverse();
        }

        graphPolygon(bounds, [color], polygon);
    }
    //graphPoints(bounds, dataSet.Data, color);
}