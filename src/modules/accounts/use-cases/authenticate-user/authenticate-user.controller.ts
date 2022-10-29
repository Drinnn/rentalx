import AuthenticateUserUseCase from '@modules/accounts/use-cases/authenticate-user/authenticate-user.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const execution = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return res.json(execution);
  }
}

export default AuthenticateUserController;
