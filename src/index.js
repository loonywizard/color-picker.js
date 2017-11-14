import ColorManager from './colorManager';
import HSBPicker from './hsbPicker';
import RGBDisplay from './rgbDisplay';
import './styles.scss';

const colorManager = new ColorManager();

const picker = new HSBPicker(colorManager);
const rgbDisplay = new RGBDisplay(colorManager);

const app = document.getElementById('app');
const pickerContainer = document.createElement('div');

function setAppBackground() {
  const { red, green, blue } = colorManager.getColorRGB();
  app.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

setAppBackground();

colorManager.subscribe(setAppBackground);

app.appendChild(pickerContainer);

pickerContainer.className = 'picker-container';
pickerContainer.appendChild(rgbDisplay.render());
pickerContainer.appendChild(picker.render());
