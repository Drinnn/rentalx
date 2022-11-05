import CreateCarController from '@modules/cars/use-cases/create-car/create-car.controller';
import ensureAdmin from '@shared/infra/http/middlewares/ensure-admin.middleware';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import { Router } from 'express';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

export default carsRoutes;
