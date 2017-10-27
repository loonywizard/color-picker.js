/**
 * Hand is a control element on input,
 * it's a white circle with which user controls
 * color value
 *
 * @param args
 *  movingArea: { x, y } - constraints for position, where hand can be
 *  position: { x, y }
 *  parent: reference to parent DOM Node
 *  parentSize: { x, y }
 *  onHandMove: a callback, that we should call, when hand was moved,
 *  we pass hand position to onHandMove
 * @constructor
 */
export default function Hand(args) {
  const {
    movingArea,
    position,
    parent,
    parentSize,
    onHandMove,
  } = args;

  let isDragging = false;

  const div = document.createElement('div');
  div.className = 'hand';

  const setHandPosition = () => {
    div.style.top = `${position.y / parentSize.y * 100}%`;
    div.style.left = `${position.x / parentSize.x * 100}%`;
  };

  setHandPosition();

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

    setHandPosition();
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
