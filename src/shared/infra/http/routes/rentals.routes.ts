import CreateRentalController from '@modules/rentals/use-cases/create-rental/create-rental.controller';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import { Router } from 'express';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export default rentalsRoutes;
