import Square from '../models/Square';
import { findLocation } from '../utils/useCase/square';

class SquareController {
  async index(req, res) {
    try {
      const { x, y } = req.params;

      const territoryFound = await Square.find();
      const FoundTerritoryByLocation = findLocation({
        locationX: x,
        locationY: y,
        squares: territoryFound
      });

      if (FoundTerritoryByLocation) {
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
      if (err.statusCode) {
        return res
          .status(err.statusCode)
          .json({ message: err.message, error: true });
      }
      return res.status(500).json({ err, error: true })
    }

  }
}

export default new SquareController();
