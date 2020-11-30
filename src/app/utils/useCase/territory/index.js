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

const formatedDataTerritory = (territory, withpainted) => {
  const data = {
    id: territory.id,
    name: territory.name,
    start: territory.start,
    end: territory.end,
    area: territory.area,
    painted_area: territory.painted_area,
  }
  if (withpainted === 'true') data.painted_squares = territory.painted_squares
  return data;
}

export {
  getPosition,
  validateLocation,
  formatedDataTerritory,
  findLocation,
}
