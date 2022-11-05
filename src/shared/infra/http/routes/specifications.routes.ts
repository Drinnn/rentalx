import CreateSpecificationController from '@modules/cars/use-cases/create-specification/create-specification.controller';
import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import ensureAdmin from '@shared/infra/http/middlewares/ensure-admin.middleware';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export default specificationsRoutes;
