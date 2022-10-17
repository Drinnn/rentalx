import ImportCategoryController from './import-category.controller';
import ImportCategoryUseCase from './import-category.use-case';

export const importCategoryUseCase = new ImportCategoryUseCase();
export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);
