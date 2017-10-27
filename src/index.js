import ColorManager from './colorManager';
import PickPicker from './pickPicker';
import './styles.scss';

const colorManager = new ColorManager();

const pickPicker = new PickPicker(colorManager);

const app = document.getElementById('app');

function setAppBackground() {
  const { hue, saturation, brightness } = colorManager.getColorHSB();
  const { red, green, blue } = colorManager.getColorRGB();
  app.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

setAppBackground();

colorManager.subscribe(setAppBackground);

const picker = document.createElement('picker');
picker.className = 'picker';
app.appendChild(picker);

picker.appendChild(pickPicker.render());