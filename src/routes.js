import { Router } from 'express';

import TerritoryController from './app/controllers/TerritoryController';

import ValidateSchemaMiddleware from './app/middlewares/validateRouteSchema';

const routes = new Router();

routes.post('/territories', ValidateSchemaMiddleware, TerritoryController.store);
routes.get('/territories', TerritoryController.show);
routes.delete('/territories/:id', TerritoryController.delete);
routes.get('/territories/:id', TerritoryController.index);

export default routes;
