import Territory from '../models/Territory';
import { getPosition, validateLocation, formatedDataTerritory } from '../utils/useCase/territory';

import Error from '../common/errors/globalError';

class TerritoryController {
  async store(req, res) {
    try {
      const { name, start, end } = req.body;
      let idFiltered = [];

      const { area, location } = getPosition(start, end);

      const foundTerritories = await Territory.find();

      if (foundTerritories.length !== 0) {
        validateLocation(foundTerritories, location);
        idFiltered = foundTerritories.map(territory => territory.id);
      }

      const territory = await Territory.create({
        id: foundTerritories.length !== 0 ?
          (Math.max(...idFiltered) + 1) : 1,
        name,
        start,
        end,
        area,
        painted_area: 0,
        location,
      });

      await territory.save();

      const formatedTerritory = formatedDataTerritory(territory);

      return res
        .status(201)
        .json({ data: formatedTerritory, error: false });
    } catch (err) {
      const { statusCode, message, error } = Error(err);
      return res.status(statusCode).json({ message, error })
    }

  }

  async show(req, res) {
    try {
      const foundTerritories = await Territory.find();

      const formatedTerritories = foundTerritories.map(territory => formatedDataTerritory(territory));
      const data = {
        count: foundTerritories.length,
        ...formatedTerritories
      }

      return res.json(data);
    } catch (err) {
      const { statusCode, message, error } = Error(err);
      return res.status(statusCode).json({ message, error })
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params;
      const { withpainted } = req.query;

      const foundTerritory = await Territory.findOne({ id });

      if (!foundTerritory || foundTerritory === null) {
        return res
          .status(404)
          .json({ message: 'this territory was not found', error: true });
      }

      const formatedTerritory = formatedDataTerritory(foundTerritory, withpainted);

      return res.json({ data: formatedTerritory, error: false });

    } catch (err) {
      const { statusCode, message, error } = Error(err);
      return res.status(statusCode).json({ message, error })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTerritory = await Territory.findOneAndDelete({ id });

      if (!deletedTerritory || deletedTerritory === null) {
        return res
          .status(404)
          .json({ message: 'this territory was not found', error: true });
      }

      return res.json({ error: false })
    } catch (err) {
      const { statusCode, message, error } = Error(err);
      return res.status(statusCode).json({ message, error })
    }
  }
}

export default new TerritoryController();
