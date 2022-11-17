import CreateRentalUseCase from '@modules/rentals/use-cases/create-rental/create-rental.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { carId, expectedReturnDate } = req.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      carId,
      userId: user.id,
      expectedReturnDate,
    });

    return res.status(201).json(rental);
  }
}

export default CreateRentalController;
