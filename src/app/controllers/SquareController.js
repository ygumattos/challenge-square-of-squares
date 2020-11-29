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

      const { data } = formatedDataSquare(square);

      return res
        .status(201)
        .json(data);
    } catch (err) {
      if (err.statusCode) return res.status(err.statusCode).json({ message: err.message });
      return res.status(500).json({ err })
    }

  }
}

export default new SquareController();
