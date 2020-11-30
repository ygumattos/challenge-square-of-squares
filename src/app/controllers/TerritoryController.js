import Square from '../models/Square';
import { getPosition, validateLocation, formatedDataSquare } from '../utils/useCase/square';

class TerritoryController {
  async store(req, res) {
    try {

      const { name, start, end } = req.body;
      let idFiltered = [];

      const { area, location } = getPosition(start, end);

      const foundSquares = await Square.find();

      if (foundSquares.length !== 0) {
        validateLocation(foundSquares, location);
        idFiltered = foundSquares.map(square => square.id);
      }

      const square = await Square.create({
        id: foundSquares.length !== 0 ?
          (Math.max(...idFiltered) + 1) : 1,
        name,
        start,
        end,
        area,
        painted_area: 0,
        location,
      });

      await square.save();

      const formatedSquare = formatedDataSquare(square);

      return res
        .status(201)
        .json({ data: formatedSquare, error: false });
    } catch (err) {
      if (err.statusCode) {
        return res
          .status(err.statusCode)
          .json({ message: err.message, error: true });
      }
      return res.status(500).json({ err, error: true })
    }

  }

  async show(req, res) {
    try {
      const foundSquares = await Square.find();

      const formatedSquares = foundSquares.map(square => formatedDataSquare(square));
      const data = {
        count: foundSquares.length,
        ...formatedSquares
      }

      return res.json(data);
    } catch (err) {
      if (err.statusCode) {
        return res
          .status(err.statusCode)
          .json({ message: err.message, error: true });
      }
      return res.status(500).json({ err, error: true })
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params;
      const { withpainted } = req.query;

      const foundSquare = await Square.findOne({ id });

      if (!foundSquare || foundSquare === null) {
        return res
          .status(404)
          .json({ message: 'this territory was not found', error: true });
      }

      const formatedSquare = formatedDataSquare(foundSquare, withpainted);

      return res.json({ data: formatedSquare, error: false });

    } catch (err) {
      if (err.statusCode) {
        return res
          .status(err.statusCode)
          .json({ message: err.message, error: true });
      }
      return res.status(500).json({ message: err.message, error: true })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedSquare = await Square.findOneAndDelete({ id });

      if (!deletedSquare || deletedSquare === null) {
        return res
          .status(404)
          .json({ message: 'this territory was not found', error: true });
      }

      return res.json({ error: false })
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

export default new TerritoryController();
