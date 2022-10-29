import CreateUserUseCase from '@modules/accounts/use-cases/create-user/create-user.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driverLicence } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driverLicence,
    });

    return res.status(201).send();
  }
}

export default CreateUserController;
