import AuthenticateUserController from '@modules/accounts/use-cases/authenticate-user/authenticate-user.controller';
import { Router } from 'express';

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post('/', authenticateUserController.handle);

export default authenticationRoutes;
