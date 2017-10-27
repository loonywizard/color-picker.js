import ColorManager from './colorManager';

import './styles.scss';

const colorManager = new ColorManager();

function Hand(args) {
  const { movingArea, position, parent, onHandMove } = args;

  let isDragging = false;

  const div = document.createElement('div');
  div.className = 'hand';

  this.setBlocklPosition = () => {
    div.style.top = `${position.y / parent.clientHeight * 100}%`;
    div.style.left = `${position.x / parent.clientWidth * 100}%`;
  };

  const changePosition = (mouseCoordinates) => {
    if (mouseCoordinates.x < movingArea.x.from) {
      position.x = movingArea.x.from;
    } else if (mouseCoordinates.x > movingArea.x.to) {
      position.x = movingArea.x.to;
    } else {
      position.x = mouseCoordinates.x;
    }

    if (mouseCoordinates.y < movingArea.y.from) {
      position.y = movingArea.y.from;
    } else if (mouseCoordinates.y > movingArea.y.to) {
      position.y = movingArea.y.to;
    } else {
      position.y = mouseCoordinates.y;
    }

    this.setBlocklPosition();
    onHandMove(position);
  };

  const handleMouseDown = (event) => {
    isDragging = true;
    const rect = parent.getBoundingClientRect();
    const offsetX = rect.left;
    const offsetY = rect.top;
    changePosition({ x: event.clientX - offsetX, y: event.clientY - offsetY });
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const rect = parent.getBoundingClientRect();
      const offsetX = rect.left;
      const offsetY = rect.top;
      changePosition({ x: event.clientX - offsetX, y: event.clientY - offsetY });
    }
  };

  parent.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('mousemove', handleMouseMove);

  this.render = () => div;

  this.destroy = () => {
    parent.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };
}

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

  const { saturation, brightness } = colorManager.getColor();

  // TODO calc here position of slider base by color
  const sliderPosition = {
    x: saturation * 250 / 100,
    y: brightness * 150 / 100,
  };

  const hand = new Hand({
    position: sliderPosition,
    movingArea: { x: { from: 0, to: width }, y: { from: 0, to: height } },
    parent: div,
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

const saturationBrightnessPicker = new SaturationBrightnessPicker();
const huePicker = new HuePicker();

document.body.appendChild(saturationBrightnessPicker.render());
document.body.appendChild(huePicker.render());
saturationBrightnessPicker.setHandPosition();
huePicker.setHandPosition();