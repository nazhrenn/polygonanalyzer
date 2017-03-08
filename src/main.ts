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

var selectedIndex: number = samplePointSets.length > 0 ? samplePointSets.length - 1 : -1;

var previousButton: HTMLInputElement = <HTMLInputElement>document.getElementById("previous");
var nextButton: HTMLInputElement = <HTMLInputElement>document.getElementById("next");
var reverseCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("reverse");
var showBestCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("showBest");
var useCustomDataCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("useCustomData");
var customDataTextArea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("customData");

var eventHandler: (ev: Event) => any = (ev: Event): any => {
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
    var text = customDataTextArea.value;

    var coords = text.split(/(\(-?\d*(?:.\d*)?,-?\d*(?:.\d*)?\)),?/);

    var numbers = [];

    for (var coord of coords) {
        if (coord != null && coord != "") {
            var points = /\((-?\d*(?:.\d*)?),(-?\d*(?:.\d*)?)\)/.exec(coord);

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

        var dataSet: DataSet<Point> = new PointAnalyzer().analyze(samplePointSet);

        var polygon: Polygon = new EdgeAnalyzer().analyze(dataSet.Data);
        var bounds: Bounds = polygon.bounds();

        var polygons: Polygon[] = new PolygonSplitter().analyze(polygon);
        if (showBest && polygon.intersections.size > 0) {
            polygon = new PolygonCombiner().analyze(polygons, polygon.intersections);
        }

        if (!showBest && polygons != null && polygons.length > 1) {
            var colors: string[] = ["red", "blue", "green", "black", "magenta", "#441155", "#99ff44", "#99ff11"];

            for (var p of polygons) {

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

            var color: string = "red"
            if (polygon.isClockwise()) {
                color = "blue";
            }

            Log.append(`Polygon: ${polygon}.`);
            graphPolygon(bounds, [color], polygon);
        }
    }
}

eventHandler(null);