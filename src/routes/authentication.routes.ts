import { Router } from 'express';

import AuthenticateUserController from '../modules/accounts/use-cases/authenticate-user/authenticate-user.controller';

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post('/', authenticateUserController.handle);

export default authenticationRoutes;
