// const stage = document.getElementById('stage');
// const ctx = stage.getContext('2d');
// stage.width = window.innerWidth;
// stage.height = window.innerHeight;

// map.on('idle', () => {
//   ctx.drawImage(map._canvas, 0, 0);
//   var imgData = ctx.getImageData(0, 0, stage.width, stage.height);

//   var data = imgData.data;

//   for (var i = 0; i < data.length; i += 4) {
//     // inverttido
//     // data[i] = data[i] ^ 255;
//     // data[i + 1] = data[i + 1] ^ 255;
//     // data[i + 2] = data[i + 2] ^ 255;
//     // b&N
//     // var grey = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
//     // data[i] = 255;
//     // data[i + 1] = grey;
//     // data[i + 2] = grey;
//     // invertido B&N
//     // var grey = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
//     // data[i] = grey ^ 255;
//     // data[i + 1] = grey ^ 255;
//     // data[i + 2] = grey ^ 255;
//   }
//   ctx.putImageData(imgData, 0, 0, 0, 0, stage.width, stage.height);
// });
