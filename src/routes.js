import { Router } from 'express';

import TerritoryController from './app/controllers/TerritoryController';
import SquareController from './app/controllers/SquareController';
import DashboardController from './app/controllers/DashboardController';

import ValidateSchemaMiddleware from './app/middlewares/validateRouteSchema';

const routes = new Router();

routes.post('/territories', ValidateSchemaMiddleware, TerritoryController.store);
routes.get('/territories', TerritoryController.show);
routes.delete('/territories/:id', TerritoryController.delete);
routes.get('/territories/:id', TerritoryController.index);

routes.get('/squares/:x/:y', SquareController.index);
routes.patch('/squares/:x/:y/paint', SquareController.update);

routes.get('/dashboard', DashboardController.show);

export default routes;
