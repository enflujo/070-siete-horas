export default class {
  constructor(map) {
    this.map = map;
    this.map.map.on('click', (e) => console.log(e.lngLat.wrap()));
  }

  infoBox() {
    const box = document.createElement('div');
    box.id = 'info';
    document.body.appendChild(box);

    this.map.on('mousemove', (e) => {
      box.innerHTML = `${JSON.stringify(e.point)}<br />${JSON.stringify(e.lngLat.wrap())}`;
    });
  }

  printMouseCoords() {}
}
