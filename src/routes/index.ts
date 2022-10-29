import { Router } from 'express';
import authenticationRoutes from 'routes/authentication.routes';
import categoriesRoutes from 'routes/categories.routes';
import specificationsRoutes from 'routes/specifications.routes';
import usersRoutes from 'routes/users.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authenticationRoutes);

export default router;
