import Hand from './hand';

function SaturationBrightnessPicker(colorManager) {
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

function HuePicker(colorManager) {
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

export default function PickPicker(colorManager) {
  const div = document.createElement('div');

  const saturationBrightnessPicker = new SaturationBrightnessPicker(colorManager);
  const huePicker = new HuePicker(colorManager);

  div.appendChild(saturationBrightnessPicker.render());
  div.appendChild(huePicker.render());

  this.render = () => div;
}
