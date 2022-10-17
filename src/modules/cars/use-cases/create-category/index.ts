import CategoriesRepository from '../../repositories/categories.repository';
import CreateCategoryUseCase from './create-category.use-case';
import CreateCategoryController from './create-category.controller';

export const categoriesRepository = new CategoriesRepository();
export const createCategoryUseCase = new CreateCategoryUseCase(
  categoriesRepository,
);
export const categoryController = new CreateCategoryController(
  createCategoryUseCase,
);
