import { convertRgbToString } from './utils/convert';

export default function RGBDisplay(colorManager) {
  const div = document.createElement('div');
  div.className = 'rgb-display';

  const updateHtml = () => {
    const { red, green, blue } = colorManager.getColorRGB();
    div.innerHTML = convertRgbToString(red, green, blue).toUpperCase();
  };

  colorManager.subscribe(updateHtml);

  updateHtml();

  this.render = () => div;
}
