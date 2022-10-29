import CreateSpecificationController from '@modules/cars/use-cases/create-specification/create-specification.controller';
import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);

export default specificationsRoutes;
