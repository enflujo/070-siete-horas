export const bounds = [
  [-74.10932754696688, 4.637018048633365],
  [-74.10570390075935, 4.632524571175038]
];

export const mapoxToken = 'pk.eyJ1IjoianVhbmNnb256YSIsImEiOiJwTzBYblFBIn0.mrChbL1APmRc2iRak665kQ';
export const mapboxStyle = 'mapbox://styles/juancgonza/ck9d75a2f07ot1ioesff2362z';

export const timelineWPercent = 98;

const timeframe = {
  start: new Date('2020-03-21T21:00:00-05:00'),
  end: new Date('2020-03-22T03:00:00-05:00')
};
timeframe.length = timeframe.end - timeframe.start;
export { timeframe };

export const tStep = timelineWPercent / timeframe.length;
