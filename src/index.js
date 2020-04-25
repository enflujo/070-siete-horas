import './scss/styles.scss';
import mapbox from 'mapbox-gl';
import data from './utls/assetsData';

const timelineWrapper = document.getElementById('timeline');
const timelinePoints = timelineWrapper.querySelector('#points');
const svg = document.getElementById('line');

const bounds = [
  [-74.10932754696688, 4.637018048633365],
  [-74.10570390075935, 4.633524571175038],
];
const timelineWPercent = 98;
const timeframe = {
  start: new Date('2020-03-21T21:00:00-05:00'),
  end: new Date('2020-03-22T03:00:00-05:00'),
};
timeframe.length = timeframe.end - timeframe.start;
const tStep = timelineWPercent / timeframe.length;

let timelinePointsD = [];

data.sort((a, b) => a.date - b.date);
console.log(data);
data.forEach((d) => {
  const left = (new Date(d.date) - timeframe.start) * tStep;

  // console.log(timelinePointsD);
});

// esto tiene que ser distinto para que se vea bien fuera de Colombia
function drawTimeline() {
  const clockStep = 1000 * 480;
  const wrapper = timelineWrapper.querySelector('#times');
  wrapper.innerHTML = '';

  for (let i = timeframe.start.getTime(); i < timeframe.end.getTime() + clockStep; i += clockStep) {
    const d = new Date(i);
    const min = document.createElement('span');
    min.className = 'timeRef';
    min.innerText = `${d.getHours()}:${('0' + d.getMinutes()).slice(-2)}`;
    min.style.left = `${(d - timeframe.start) * tStep}%`;
    wrapper.appendChild(min);
  }
}

function createMarker(options, d, map) {
  return new mapbox.Marker(options)
    .setLngLat(d.coords)
    .setPopup(
      new mapbox.Popup({
        offset: 25,
        // closeOnClick: true,
      }) // add popups
        .setHTML(
          `<h3>ID ${d.id}</h3><p class="markerTime">${new Date(d.date).toLocaleTimeString('es-CO')}</p><p>${d.desc}</p>`
        )
    )
    .addTo(map);
}

if (document.getElementById('map')) {
  drawTimeline();

  mapbox.accessToken = 'pk.eyJ1IjoianVhbmNnb256YSIsImEiOiJwTzBYblFBIn0.mrChbL1APmRc2iRak665kQ';
  const map = new mapbox.Map({
    container: 'map',
    style: 'mapbox://styles/juancgonza/ck9d75a2f07ot1ioesff2362z',
    // zoom: 17.44,
    // center: [-74.108, 4.6355],
    bounds: bounds,
    interactive: false,
    attributionControl: true,
    fadeDuration: 0,
    customAttribution: '<a href="https://cerosetenta.uniandes.edu.co" target="_blank">070 Universidad de los Andes</a>',
  });

  map.on('mousemove', (e) => {
    document.getElementById('info').innerHTML =
      // e.point is the x, y coordinates of the mousemove event relative
      // to the top-left corner of the map
      JSON.stringify(e.point) +
      '<br />' +
      // e.lngLat is the longitude, latitude geographical position of the event
      JSON.stringify(e.lngLat.wrap());
  });

  map.on('click', (e) => {
    console.log(e.lngLat.wrap());
  });

  window.onresize = () => {
    map.fitBounds(bounds);
  };

  data.forEach((d) => {
    const options = d.hasOwnProperty('color') ? { color: d.color } : {};
    const marker = createMarker(options, d, map);
    const timePoint = document.createElement('span');
    timePoint.className = 'timePoint';
    timelinePoints.appendChild(timePoint);
    const left = (new Date(d.date) - timeframe.start) * tStep;

    if (left < 100) {
      timePoint.style.left = `${left}%`;
    } else {
      timePoint.classList.add('nextDay');
      timePoint.style.left = '100%';
    }

    if (d.hasOwnProperty('pushY')) {
      timePoint.style.bottom = `${timePoint.offsetTop + timePoint.offsetHeight + d.pushY}px`;
    }

    marker.on('click', () => {});

    timePoint.onmouseenter = (e) => {
      if (d.hasOwnProperty('newBounds')) {
        map.fitBounds(d.newBounds);

        setTimeout(() => {
          const position = timePoint.getBoundingClientRect();
          animateLine(
            { x: position.x + position.width / 2, y: position.y + position.height / 2 },
            map.project(d.coords)
          );
        }, 400);
      } else {
        const position = timePoint.getBoundingClientRect();
        animateLine({ x: position.x + position.width / 2, y: position.y + position.height / 2 }, map.project(d.coords));
      }
    };

    timePoint.onmouseleave = () => {
      const ele = svg.querySelector('#lineEle');
      ele.setAttribute('x1', 0);
      ele.setAttribute('x2', 0);
      ele.setAttribute('y1', 0);
      ele.setAttribute('y2', 0);
      ele.style.animation = 'none';
      ele.style.strokeDasharray = 0;
      ele.style.strokeDashoffset = 0;

      if (d.hasOwnProperty('newBounds')) {
        map.fitBounds(bounds);
      }
    };
  });
  // const canchaFutbol = createMarker(
  //   {
  //     color: 'yellow',
  //   },
  //   [-74.10767373526386, 4.636246104774585],
  //   map
  // );

  // const areaAdministrativa = createMarker({}, [-74.10740667374023, 4.634520319189022], map);
}

function animateLine(a, b) {
  const ele = svg.querySelector('#lineEle');
  ele.setAttribute('x1', a.x | 0);
  ele.setAttribute('x2', b.x | 0);
  ele.setAttribute('y1', a.y | 0);
  ele.setAttribute('y2', b.y | 0);

  const distance = Math.hypot(b.x - a.x, b.y - a.y);
  ele.style.animation = 'move .3s linear forwards';
  ele.style.strokeDasharray = `${distance} ${distance}`;
  ele.style.strokeDashoffset = distance;
}
