
import { Point } from "./point";
import { Graph } from "./bounds";

export class PlotGraph extends Graph {
  private color: string;

  constructor(top: number, left: number, bottom: number, right: number) {
    super(top, left, bottom, right);

    this.clear();
  }

  public setColor(color: string): void {
    this.color = color;
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
  }

  public clear(): void {
    this.setColor("black");
    this.context.clearRect(0, 0, this.DisplayWidth, this.DisplayHeight);
  }

  public polygon(points: Point[], arrow: boolean = false): void {

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

  public point(point: Point): void {
    let t: Point = this.transpose(point);
    this.context.fillRect(t.x, t.y, 1, 1);
  }

  line(from: Point, to: Point): void {
    let ft: Point = this.transpose(from);
    let tt: Point = this.transpose(to);

    this.context.beginPath();
    this.context.moveTo(ft.x, ft.y);
    this.context.lineTo(tt.x, tt.y);
    this.context.stroke();
  }

  arrow(from: Point, to: Point): void {
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

  private transpose(point: Point): Point {
    let p: Point = new Point(point.x, point.y)
    p.translate(this.left, this.top);
    p.scale(this.HorizontalScale, this.VerticalScale);
    return p;
  }
}