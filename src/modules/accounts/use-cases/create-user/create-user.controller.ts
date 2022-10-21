import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserUseCase from './create-user.use-case';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password, driverLicence } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      username,
      email,
      password,
      driverLicence,
    });

    return res.status(201).send();
  }
}

export default CreateUserController;
