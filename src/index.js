function Hand(args) {
  const { movingArea, position, parent } = args;

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

function ColorBlock() {
  const div = document.createElement('div');
  div.className = 'color-block';

  // TODO calc here position of slider base by color
  const sliderPosition = {
    x: 50,
    y: 70,
  };

  const hand = new Hand({
    position: sliderPosition,
    movingArea: { x: { from: 0, to: 250 }, y: { from: 0, to: 150 } },
    parent: div,
  });

  div.appendChild(hand.render());

  this.render = () => div;
  this.setHandPosition = hand.setBlocklPosition;
}

function HuePicker() {
  const div = document.createElement('div');
  div.className = 'hue-picker';

  const sliderPosition = {
    x: 50,
    y: 7,
  };

  const hand = new Hand({
    position: sliderPosition,
    movingArea: { x: { from: 0, to: 250 }, y: { from: 7, to: 7 } },
    parent: div,
  });

  div.appendChild(hand.render());

  this.render = () => div;
  this.setHandPosition = hand.setBlocklPosition;
}

const colorBlock = new ColorBlock();
const huePicker = new HuePicker();

document.body.appendChild(colorBlock.render());
document.body.appendChild(huePicker.render());
colorBlock.setHandPosition();
huePicker.setHandPosition();