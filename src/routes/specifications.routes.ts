import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensure-authenticated.middleware';
import CreateSpecificationController from '../modules/cars/use-cases/create-specification/create-specification.controller';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export default specificationsRoutes;
