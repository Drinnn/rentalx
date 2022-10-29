import CreateCategoryUseCase from '@modules/cars/use-cases/create-category/create-category.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export default CreateCategoryController;
