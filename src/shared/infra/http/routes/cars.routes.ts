import CreateCarController from '@modules/cars/use-cases/create-car/create-car.controller';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import { Router } from 'express';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthenticated);
carsRoutes.post('/', createCarController.handle);

export default carsRoutes;
