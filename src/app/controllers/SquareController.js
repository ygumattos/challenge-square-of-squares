import Square from '../models/Square';
import { getArea, validateArea, formatedDataSquare } from '../utils/useCase/square';

class SquareController {
  async store(req, res) {
    try {

      const { name, start, end } = req.body;

      const area = getArea(start, end);

      const foundSquares = await Square.find();
      validateArea(foundSquares, area);

      const square = await Square.create({
        id: foundSquares.length + 1,
        name,
        start,
        end,
        area,
        painted_area: 0,
      });

      await square.save();

      const formatedSquare = formatedDataSquare(square);

      return res
        .status(201)
        .json({ data: formatedSquare, error: false });
    } catch (err) {
      if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });
      return res.status(500).json({ err })
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
      if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });
      return res.status(500).json({ err })
    }
  }

  async index(req, res) {

  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedSquare = await Square.findOneAndDelete({ id });

      return res.json({ deletedSquare })
    } catch (err) {
      if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });
      return res.status(500).json({ err })
    }
  }
}

export default new SquareController();
