export default class {
  constructor(map) {
    this.map = map;
  }

  infoBox() {
    const box = document.createElement('div');

    document.body.appendChild(box);

    this.map.on('mousemove', (e) => {
      box.innerHTML = `${JSON.stringify(e.point)}<br />${JSON.stringify(e.lngLat.wrap())}`;
    });
  }

  printMouseCoords() {
    this.map.on('click', (e) => console.log(e.lngLat.wrap()));
  }
}
