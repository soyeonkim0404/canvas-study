import CanvasOption from "./CanvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class Spark extends CanvasOption {
  constructor(x, y, vx, vy, opacity, colorDeg) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.colorDeg = colorDeg;
  }

  update() {
    this.opacity -= 0.015;

    this.x += this.vx;
    this.x -= 0;
    this.y += this.vy;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
