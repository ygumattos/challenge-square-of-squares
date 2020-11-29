import { Router } from 'express';

import SquareController from './app/controllers/SquareController';

import ValidateSchemaMiddleware from './app/middlewares/validateRouteSchema';

const routes = new Router();

routes.post('/territories', ValidateSchemaMiddleware, SquareController.store);

export default routes;
