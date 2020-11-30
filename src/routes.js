import { Router } from 'express';

import SquareController from './app/controllers/SquareController';

import ValidateSchemaMiddleware from './app/middlewares/validateRouteSchema';

const routes = new Router();

routes.post('/territories', ValidateSchemaMiddleware, SquareController.store);
routes.get('/territories', SquareController.show);
routes.delete('/territories/:id', SquareController.delete);
routes.get('/territories/:id', SquareController.index);

export default routes;
