export default class {
  constructor(map) {
    this.map = map;
    const svg = document.getElementById('line');
    this.line = svg.querySelector('#lineEle');
  }

  animate(a, b, newBounds, movedPoint) {
    if (newBounds) {
      this.map.fitBounds(newBounds);
      setTimeout(() => {
        const newB = this.map.getScreenCoordinates(movedPoint);
        this.draw(a, newB);
      }, 450);
    } else {
      this.draw(a, b);
    }
  }

  draw(a, b) {
    const ele = this.line;
    ele.setAttribute('x1', a.x | 0);
    ele.setAttribute('x2', b.x | 0);
    ele.setAttribute('y1', a.y | 0);
    ele.setAttribute('y2', b.y | 0);

    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    ele.style.animation = 'move .3s linear forwards';
    ele.style.strokeDasharray = `${distance} ${distance}`;
    ele.style.strokeDashoffset = distance;
  }

  reset(newBounds) {
    const ele = this.line;
    ele.setAttribute('x1', 0);
    ele.setAttribute('x2', 0);
    ele.setAttribute('y1', 0);
    ele.setAttribute('y2', 0);
    ele.style.animation = 'none';
    ele.style.strokeDasharray = 0;
    ele.style.strokeDashoffset = 0;

    if (newBounds) {
      this.map.resetBounds();
    }
  }
}
