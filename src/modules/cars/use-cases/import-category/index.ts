import CategoriesRepository from '../../repositories/implementations/categories.repository';
import ImportCategoryController from './import-category.controller';
import ImportCategoryUseCase from './import-category.use-case';

export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase,
  );

  return importCategoryController;
};
