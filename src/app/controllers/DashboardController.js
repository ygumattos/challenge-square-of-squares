import Territory from '../models/Territory';

import Error from '../common/errors/globalError';

class DashboardController {
  async show(req, res) {
    try {

      const territories = await Territory.find().lean();

      const mostPaintedArea = territories.sort(
        (a, b) => b.painted_squares.length - a.painted_squares.length
      )

      const territoriesWithTotalPaintedArea = territories.map(territory => {
        const paintedAreaSquares = territory.painted_squares.map(painted => painted.x * painted.y)
        const totalPaintedArea = paintedAreaSquares.reduce((acc, cur) => acc + cur);
        return {
          ...territory,
          paintedArea: totalPaintedArea
        }
      });

      const mostProportionalPaintedArea = territoriesWithTotalPaintedArea.sort(
        (a, b) => (b.area - b.paintedArea) - (a.area - a.paintedArea)
      )

      return res
        .status(201)
        .json({ mostPaintedArea, mostProportionalPaintedArea });
    } catch (err) {
      const { statusCode, message, error } = Error(err);
      return res.status(statusCode).json({ message, error })
    }

  }
}

export default new DashboardController();
