import CreateCarUseCase from '@modules/cars/use-cases/create-car/create-car.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return res.status(201).json(car);
  }
}

export default CreateCarController;
