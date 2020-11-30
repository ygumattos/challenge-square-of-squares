import Territory from '../models/Territory';
import { findLocation } from '../utils/useCase/territory';

import Error from '../common/errors/globalError';

class SquareController {
  async index(req, res) {
    try {
      const { x, y } = req.params;

      const territoryFound = await Territory.find();
      const FoundTerritoryByLocation = findLocation({
        locationX: x,
        locationY: y,
        squares: territoryFound
      });

      if (!FoundTerritoryByLocation) {
        return res
          .status(404)
          .json({ message: 'this square does not belong to any territory', error: true });
      }

      const { painted_squares: paintedSquares } = FoundTerritoryByLocation;
      const foundSquare = paintedSquares.find(square => square.x === x && square.y === y);

      return res
        .status(201)
        .json({ data: { x, y, painted: !!foundSquare }, error: false });
    } catch (err) {
      const { statusCode, message, error } = Error(err);
      return res.status(statusCode).json({ message, error })
    }

  }

  async update(req, res) {
    try {
      const { x, y } = req.params;

      const territoryFound = await Territory.find();
      const FoundTerritoryByLocation = findLocation({
        locationX: x,
        locationY: y,
        squares: territoryFound
      });

      if (!FoundTerritoryByLocation) {
        return res
          .status(401)
          .json({ message: 'this square does not belong to any territory', error: true });
      }

      const { painted_squares: paintedSquares } = FoundTerritoryByLocation;
      const foundPaintedSquare = paintedSquares.find(square => square.x === x && square.y === y);

      if (foundPaintedSquare) {
        return res
          .status(401)
          .json({ message: 'this square already painted', error: true });
      }

      const updated = await Territory.updateOne({
        id: FoundTerritoryByLocation.id,
      }, {
        painted_squares: [
          ...FoundTerritoryByLocation.painted_squares,
          { x, y },
        ]
      })

      return res
        .status(201)
        .json({ data: { x, y, painted: true }, error: false });

    } catch (err) {
      const { statusCode, message, error } = Error(err);
      return res.status(statusCode).json({ message, error })
    }
  }
}

export default new SquareController();
