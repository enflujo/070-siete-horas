const PI = Math.PI;

export function degToRad(deg) {
  return (deg * PI) / 180;
}

export class Findcoords {
  constructor(map) {
    map.on('click', e => console.log(e.lngLat.wrap()));
  }

  infoBox() {
    const box = document.createElement('div');
    box.id = 'info';
    document.body.appendChild(box);

    this.map.on('mousemove', e => {
      box.innerHTML = `${JSON.stringify(e.point)}<br />${JSON.stringify(e.lngLat.wrap())}`;
    });
  }
}
