import CreateCarController from '@modules/cars/use-cases/create-car/create-car.controller';
import ListAvailableCarsController from '@modules/cars/use-cases/list-available-cars/list-available-cars.controller';
import ensureAdmin from '@shared/infra/http/middlewares/ensure-admin.middleware';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import { Router } from 'express';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);
carsRoutes.get('/available', listAvailableCarsController.handle);

export default carsRoutes;
