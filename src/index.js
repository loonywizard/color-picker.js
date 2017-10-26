function Hand(args) {
  const { movingArea, position, parent } = args;

  let isDragging = false;

  const div = document.createElement('div');
  div.className = 'hand';

  const changePosition = (mouseCoordinates) => {
    if (mouseCoordinates.x < 0) {
      position.x = 0;
    } else if (mouseCoordinates.x > movingArea.x) {
      position.x = movingArea.x;
    } else {
      position.x = mouseCoordinates.x;
    }

    if (mouseCoordinates.y < 0) {
      position.y = 0;
    } else if (mouseCoordinates.y > movingArea.y) {
      position.y = movingArea.y;
    } else {
      position.y = mouseCoordinates.y;
    }

    div.style.top = `${position.y / parent.clientHeight * 100}%`;
    div.style.left = `${position.x / parent.clientWidth * 100}%`;
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
    movingArea: { x: 250, y: 150 },
    parent: div,
  });

  div.appendChild(hand.render());

  this.render = () => div;
}

const colorBlock = new ColorBlock();

document.body.appendChild(colorBlock.render());