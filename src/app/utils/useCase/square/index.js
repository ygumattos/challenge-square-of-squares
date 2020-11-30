const getPosition = (start, end) => {
  const locationX = (start.x - end.x);
  const locationY = (start.y - end.y);
  const area = locationX * locationY;

  return {
    area,
    location: {
      x: Math.abs(locationX),
      y: Math.abs(locationY),
    }
  }
};

const findLocation = ({ locationX, locationY, squares }) => squares.find(square => {
  return locationX <= square.location.x && locationY <= square.location.y
});

const validateLocation = (squares, location) => {
  const { x: locationX, y: locationY } = location;
  const intoLocation = findLocation({ locationX, locationY, squares });

  if (intoLocation) {
    throw {
      statusCode: 401,
      message: 'this new territory overlays another territory',
    };
  }
}

const formatedDataSquare = (square, painted_squares) => {
  const data = {
    id: square.id,
    name: square.name,
    start: square.start,
    end: square.end,
    area: square.area,
    painted_area: square.painted_area,
  }
  if (painted_squares) data = { ...data, painted_squares: square.painted_squares }
  return data;
}

export {
  getPosition,
  validateLocation,
  formatedDataSquare,
  findLocation,
}
