import CreateCarSpecificationsController from '@modules/cars/use-cases/create-car-specifications/create-car-specifications.controller';
import CreateCarController from '@modules/cars/use-cases/create-car/create-car.controller';
import ListAvailableCarsController from '@modules/cars/use-cases/list-available-cars/list-available-cars.controller';
import ensureAdmin from '@shared/infra/http/middlewares/ensure-admin.middleware';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import { Router } from 'express';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationsController =
  new CreateCarSpecificationsController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);
carsRoutes.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle,
);
carsRoutes.get('/available', listAvailableCarsController.handle);

export default carsRoutes;
