import authenticationRoutes from '@shared/infra/http/routes/authentication.routes';
import carsRoutes from '@shared/infra/http/routes/cars.routes';
import categoriesRoutes from '@shared/infra/http/routes/categories.routes';
import rentalsRoutes from '@shared/infra/http/routes/rentals.routes';
import specificationsRoutes from '@shared/infra/http/routes/specifications.routes';
import usersRoutes from '@shared/infra/http/routes/users.routes';
import { Router } from 'express';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/cars', carsRoutes);
router.use('/rentals', rentalsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authenticationRoutes);

export default router;
