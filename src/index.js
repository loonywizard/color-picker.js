import ColorManager from './colorManager';
import HSBPicker from './hsbPicker';
import './styles.scss';

const colorManager = new ColorManager();

const picker = new HSBPicker(colorManager);

const app = document.getElementById('app');

function setAppBackground() {
  const { hue, saturation, brightness } = colorManager.getColorHSB();
  const { red, green, blue } = colorManager.getColorRGB();
  app.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

setAppBackground();

colorManager.subscribe(setAppBackground);

const pickerContainer = document.createElement('div');
pickerContainer.className = 'picker-container';
app.appendChild(pickerContainer);

pickerContainer.appendChild(picker.render());