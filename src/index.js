import ColorManager from './colorManager';
import Hand from './hand';
import './styles.scss';

const colorManager = new ColorManager();

function SaturationBrightnessPicker() {
  const div = document.createElement('div');
  div.className = 'saturation-brightness-picker';

  const saturationGradient = document.createElement('div');
  saturationGradient.className = 'saturation-gradient';
  div.appendChild(saturationGradient);

  const brightnessGradient = document.createElement('div');
  brightnessGradient.className = 'brightness-gradient';
  div.appendChild(brightnessGradient);

  const width = 250;
  const height = 150;

  const updateColor = () => {
    const hue = colorManager.getHue();
    div.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
  };

  updateColor();

  colorManager.subscribe(updateColor);

  function calculateSaturation(handPosition) {
    colorManager.setSaturation(handPosition.x * 100 / 250);
  }

  function calculateBrightness(handPosition) {
    colorManager.setBrightness((150 - handPosition.y) * 100 / 150);
  }

  function handleHandMove(handPosition) {
    calculateSaturation(handPosition);
    calculateBrightness(handPosition);
  }

  const { saturation, brightness } = colorManager.getColorHSB();

  // TODO calc here position of slider base by color
  const sliderPosition = {
    x: saturation * 250 / 100,
    y: brightness * 150 / 100,
  };

  const hand = new Hand({
    position: sliderPosition,
    movingArea: { x: { from: 0, to: width }, y: { from: 0, to: height } },
    parent: div,
    onHandMove: handleHandMove,
  });

  div.appendChild(hand.render());

  this.render = () => div;
  this.setHandPosition = hand.setBlocklPosition;
}

function HuePicker() {
  const div = document.createElement('div');
  div.className = 'hue-picker';

  const hue = colorManager.getHue();

  const sliderPosition = {
    x: hue * 250 / 360,
    y: 7,
  };

  function calculateHue(handPosition) {
    colorManager.setHue(handPosition.x * 360 / 250);
  }

  const hand = new Hand({
    position: sliderPosition,
    movingArea: { x: { from: 0, to: 250 }, y: { from: 7, to: 7 } },
    parent: div,
    onHandMove: calculateHue,
  });

  div.appendChild(hand.render());

  this.render = () => div;
  this.setHandPosition = hand.setBlocklPosition;
}

const app = document.getElementById('app');

function setAppBackground() {
  const { hue, saturation, brightness } = colorManager.getColorHSB();
  const { red, green, blue } = colorManager.getColorRGB();
  app.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

setAppBackground();

colorManager.subscribe(setAppBackground);

const saturationBrightnessPicker = new SaturationBrightnessPicker();
const huePicker = new HuePicker();

const picker = document.createElement('div');
picker.className = 'picker';


picker.appendChild(saturationBrightnessPicker.render());
picker.appendChild(huePicker.render());
app.appendChild(picker);

saturationBrightnessPicker.setHandPosition();
huePicker.setHandPosition();