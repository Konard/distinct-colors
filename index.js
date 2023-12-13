const distinctColors = require('distinct-colors').default;
const fs = require('fs');

function rgbToHexColorArray(inputArray) {
  const outputArray = inputArray.map(obj => {
      const [r, g, b] = obj._rgb; 
      let rHex = Math.round(r).toString(16);
      let gHex = Math.round(g).toString(16);
      let bHex = Math.round(b).toString(16);
      
      if (rHex.length < 2) {
          rHex = '0' + rHex;
      }
      if (gHex.length < 2) {
          gHex = '0' + gHex;
      }
      if (bHex.length < 2) {
          bHex = '0' + bHex;
      }
      
      return '#' + rHex + gHex + bHex;
  });
  return outputArray;
}

const palette = distinctColors({count: 500, lightMin: 50, chromaMin: 50});
const colors = rgbToHexColorArray(palette);

console.log(JSON.stringify(colors, null, 2));

var html = '<!DOCTYPE html><html><body style="margin: 0; font-size: 0">';
  
colors.forEach(color => {
  html += `<span style="margin: 5px; width:100px;height:100px;display:inline-block;background-color:${color};"></span>`;
});

html += '</body></html>';

console.log(html);

fs.writeFile('output.html', html, function (err) {
  if (err) throw err;
  console.log('Saved!');
});