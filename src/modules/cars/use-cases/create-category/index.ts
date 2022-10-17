import CategoriesRepository from '../../repositories/implementations/categories.repository';
import CreateCategoryUseCase from './create-category.use-case';
import CreateCategoryController from './create-category.controller';

export const categoriesRepository = CategoriesRepository.getInstance();
export const createCategoryUseCase = new CreateCategoryUseCase(
  categoriesRepository,
);
export const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);
