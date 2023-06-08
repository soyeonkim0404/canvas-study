import Background from './Background.js';
import Wall from './Wall.js';

export default class App {
  static canvas = document.querySelector('canvas');
  static ctx = App.canvas.getContext('2d');
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector('#bg3-img'), speed: -1 }),
      new Background({ img: document.querySelector('#bg2-img'), speed: -2 }),
      new Background({ img: document.querySelector('#bg1-img'), speed: -4 }),
    ];
    this.walls = [new Wall({ type: 'SMALL' })];
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    //canvas 4:3 비율로 만들기
    const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;
    App.canvas.style.width = width + 'px';
    App.canvas.style.height = width * (3 / 4) + 'px';
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;
      if (delta < App.interval) return;

      // 배경 관리
      this.backgrounds.forEach((background) => {
        //background.update();
        background.draw();
      });

      // 벽 관리
      for (let i = this.walls.length - 1; i >= 0; i--) {
        this.walls[i].update();
        this.walls[i].draw();
        // 벽 제거관련
        if (this.walls[i].isOutside) {
          this.walls.splice(i, 1);
          continue;
        }
        // 새로운 벽 생성관련
        if (this.walls[i].canGenerateNext) {
          this.walls[i].generatedNext = true;
          const newWall = new Wall({ type: Math.random() > 0.3 ? 'SMALL' : 'BIG' });
          this.walls.push(newWall);
        }
      }

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}
