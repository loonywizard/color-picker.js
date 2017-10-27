import { getRandomInt } from './utils/random';

function ColorManager() {
  const getRandomHue = () => getRandomInt(0, 360);
  const getRandomSaturation = () => getRandomInt(0, 100);
  const getRandomBrightness = () => getRandomInt(0, 100);

  const subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach(cb => { cb(); });
  };

  this.subscribe = (callback, values) => {
    subscribers.push(callback);
  };

  let hue = getRandomHue();
  let saturation = getRandomSaturation();
  let brightness = getRandomBrightness();

  this.getColor = () => ({ hue, saturation, brightness });
  this.getHue = () => hue;
  this.getSaturation = () => saturation;
  this.getBrightness = () => brightness;

  this.setColor = (color) => {
    if (color.hue) {
      hue = color.hue;
    }
    if (color.saturation) {
      saturation = color.saturation;
    }
    if (color.brightness) {
      brightness = color.brightness;
    }
    notifySubscribers();
  };
  this.setHue = (hue) => {
    this.setColor({ hue });
  };
  this.setSaturation = (saturation) => {
    this.setColor({ saturation });
  };
  this.setBrightness = (brightness) => {
    this.setColor({ brightness });
  };
}

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

function SaturationBrightnessBlock() {
  const div = document.createElement('div');
  div.className = 'color-block';

  const width = 250;
  const height = 150;

  const updateColor = () => {
    const hue = colorManager.getHue();
    div.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
  };

  updateColor();

  colorManager.subscribe(updateColor);

  // TODO calc here position of slider base by color
  const sliderPosition = {
    x: 50,
    y: 70,
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

const saturationBrightnessBlock = new SaturationBrightnessBlock();
const huePicker = new HuePicker();

document.body.appendChild(saturationBrightnessBlock.render());
document.body.appendChild(huePicker.render());
saturationBrightnessBlock.setHandPosition();
huePicker.setHandPosition();