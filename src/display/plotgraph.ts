
import { Point } from "./../data/point";
import { Graph } from "./graph";
import { Polygon } from "./../data/polygon";

export class PlotGraph extends Graph {

  constructor(top: number, left: number, bottom: number, right: number) {
    super(top, left, bottom, right);
  }


  public polygon(polygon: Polygon, arrow: boolean = false): void {
    polygon.edges.reset();
    for (var edge of polygon.edges.Items) {
      this.point(edge.start);

      if (arrow) {
        this.arrow(edge.start, edge.end);
      } else {
        this.line(edge.start, edge.end);
      }
    }
  }

  public polygonPoints(points: Point[], arrow: boolean = false): void {

    for (let i = 0; i < points.length; i++) {
      let p: Point = points[i];

      this.point(p);

      var t = i + 1;
      if (t >= points.length) {
        t = 0;
      }

      if (arrow) {
        this.arrow(points[t], p);
      } else {
        this.line(points[t], p);
      }
    }
  }

  public point(point: Point, displayText: boolean = true, width: number = 1, height: number = 1): void {
    let t: Point = this.transpose(point);
    this.context.fillRect(t.x, t.y, width, height);

    if (displayText) {
      var temp: string = this.color;

      this.setColor("black");
      var textX = t.x + 5;
      if (textX + 15 > this.DisplayWidth) {
        textX = textX - 35;
      }
      var textY  = t.y - 5;
      if (textY + 5 > this.DisplayHeight) {
        textY = textY - 5;
      }
      if (textY - 10 < 0) {
        textY = textY + 10;
      }

      this.context.fillText(point.toString(), textX, textY);
      this.setColor(temp);
    }
  }

  public circle(point: Point, radius: number) {
    let t: Point = this.transpose(point);
    this.context.moveTo(t.x - radius, t.y);
    this.context.ellipse(t.x, t.y, radius, radius, Math.PI, 0, 360);
    this.context.stroke();
  }

  public line(from: Point, to: Point): void {
    let ft: Point = this.transpose(from);
    let tt: Point = this.transpose(to);

    this.context.beginPath();
    this.context.moveTo(ft.x, ft.y);
    this.context.lineTo(tt.x, tt.y);
    this.context.stroke();
  }

  public arrow(from: Point, to: Point): void {
    let ft: Point = this.transpose(from);
    let tt: Point = this.transpose(to);

    var headlen = 5;   // length of head in pixels
    var angle = Math.atan2(tt.y - ft.y, tt.x - ft.x);

    this.line(from, to);

    this.context.beginPath();
    this.context.moveTo(tt.x, tt.y);
    this.context.lineTo(tt.x - headlen * Math.cos(angle - Math.PI / 6), tt.y - headlen * Math.sin(angle - Math.PI / 6));
    this.context.moveTo(tt.x, tt.y);
    this.context.lineTo(tt.x - headlen * Math.cos(angle + Math.PI / 6), tt.y - headlen * Math.sin(angle + Math.PI / 6));
    this.context.stroke();
  }
}