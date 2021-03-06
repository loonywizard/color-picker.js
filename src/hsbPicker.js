import Hand from './hand';
import {
  HUE_PICKER_WIDTH,
  HUE_PICKER_HEIGHT,
  SATURATION_BRIGHTNESS_PICKER_HEIGHT,
  SATURATION_BRIGHTNESS_PICKER_WIDTH,
  HUE_RANGE,
  SATURATION_RANGE,
  BRIGHTNESS_RANGE,
} from './consts';

function SaturationBrightnessPicker(colorManager) {
  const pickerWidth = SATURATION_BRIGHTNESS_PICKER_WIDTH;
  const pickerHeight = SATURATION_BRIGHTNESS_PICKER_HEIGHT;

  const div = document.createElement('div');
  const saturationGradient = document.createElement('div');
  const brightnessGradient = document.createElement('div');

  const updateColor = () => {
    const hue = colorManager.getHue();
    div.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
  };

  div.className = 'saturation-brightness-picker';

  saturationGradient.className = 'saturation-gradient';
  div.appendChild(saturationGradient);

  brightnessGradient.className = 'brightness-gradient';
  div.appendChild(brightnessGradient);

  updateColor();

  colorManager.subscribe(updateColor);

  function calculateSaturation(handPosition) {
    colorManager.setSaturation(handPosition.x * SATURATION_RANGE.MAX / pickerWidth);
  }

  function calculateBrightness(handPosition) {
    const brightness = (pickerHeight - handPosition.y) * BRIGHTNESS_RANGE.MAX / pickerHeight;
    colorManager.setBrightness(brightness);
  }

  function handleHandMove(handPosition) {
    calculateSaturation(handPosition);
    calculateBrightness(handPosition);
  }

  const { saturation, brightness } = colorManager.getColorHSB();

  const sliderPosition = {
    x: saturation * pickerWidth / SATURATION_RANGE.MAX,
    y: (BRIGHTNESS_RANGE.MAX - brightness) * pickerHeight / BRIGHTNESS_RANGE.MAX,
  };

  const hand = new Hand({
    position: sliderPosition,
    movingArea: { x: { from: 0, to: pickerWidth }, y: { from: 0, to: pickerHeight } },
    parent: div,
    parentSize: { x: pickerWidth, y: pickerHeight },
    onHandMove: handleHandMove,
  });

  div.appendChild(hand.render());

  this.render = () => div;
}

function HuePicker(colorManager) {
  const div = document.createElement('div');
  div.className = 'hue-picker';

  const hue = colorManager.getHue();

  const sliderPosition = {
    x: hue * HUE_PICKER_WIDTH / HUE_RANGE.MAX,
    y: HUE_PICKER_HEIGHT / 2,
  };

  function calculateHue(handPosition) {
    colorManager.setHue(handPosition.x * HUE_RANGE.MAX / HUE_PICKER_WIDTH);
  }

  const hand = new Hand({
    position: sliderPosition,
    movingArea: {
      x: { from: 0, to: HUE_PICKER_WIDTH },
      y: { from: HUE_PICKER_HEIGHT / 2, to: HUE_PICKER_HEIGHT / 2 },
    },
    parent: div,
    parentSize: { x: HUE_PICKER_WIDTH, y: HUE_PICKER_HEIGHT },
    onHandMove: calculateHue,
  });

  div.appendChild(hand.render());

  this.render = () => div;
}

export default function HSBPicker(colorManager) {
  const div = document.createElement('div');

  const saturationBrightnessPicker = new SaturationBrightnessPicker(colorManager);
  const huePicker = new HuePicker(colorManager);

  div.appendChild(saturationBrightnessPicker.render());
  div.appendChild(huePicker.render());

  this.render = () => div;
}
