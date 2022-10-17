import CategoriesRepository from '../../repositories/categories.repository';
import CreateCategoryUseCase from './categories-create.use-case';
import CreateCategoryController from './create-category.controller';

export const categoriesRepository = new CategoriesRepository();
export const createCategoryUseCase = new CreateCategoryUseCase(
  categoriesRepository,
);
export const categoryController = new CreateCategoryController(
  createCategoryUseCase,
);
