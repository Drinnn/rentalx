import ListAvailableCarsUseCase from '@modules/cars/use-cases/list-available-cars/list-available-cars.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, categoryId } = req.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase,
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      categoryId: categoryId as string,
    });

    return res.json(cars);
  }
}

export default ListAvailableCarsController;
