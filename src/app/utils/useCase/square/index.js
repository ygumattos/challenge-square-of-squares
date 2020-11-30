const getArea = (start, end) => (start.x - end.x) * (start.y - end.y);

const validateArea = (squares, area) => {
  const sameArea = squares.find(square => square.area === area);

  if (sameArea) {
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
  getArea,
  validateArea,
  formatedDataSquare,
}
