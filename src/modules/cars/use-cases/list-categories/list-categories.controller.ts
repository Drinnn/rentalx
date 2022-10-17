import { Request, Response } from 'express';
import ListCategoriesUseCase from './list-categories.use-case';

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response): Response {
    const categories = this.listCategoriesUseCase.execute();

    return res.json(categories);
  }
}

export default ListCategoriesController;
