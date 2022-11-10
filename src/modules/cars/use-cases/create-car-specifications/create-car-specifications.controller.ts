import CreateCarSpecificationsUseCase from '@modules/cars/use-cases/create-car-specifications/create-car-specifications.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCarSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specificationIds } = req.body;

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationsUseCase,
    );

    const car = await createCarSpecificationsUseCase.execute({
      carId: id,
      specificationIds,
    });

    return res.status(201).json(car);
  }
}

export default CreateCarSpecificationsController;
