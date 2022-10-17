import CategoriesRepository from '../../repositories/implementations/categories.repository';
import ImportCategoryController from './import-category.controller';
import ImportCategoryUseCase from './import-category.use-case';

export const categoriesRepository = CategoriesRepository.getInstance();
export const importCategoryUseCase = new ImportCategoryUseCase(
  categoriesRepository,
);
export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);
