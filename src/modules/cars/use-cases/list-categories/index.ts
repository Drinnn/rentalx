import CategoriesRepository from '../../repositories/implementations/categories.repository';
import ListCategoriesController from './list-categories.controller';
import ListCategoriesUseCase from './list-categories.use-case';

export default (): ListCategoriesController => {
  const listCategoriesRepository = new CategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(
    listCategoriesRepository,
  );
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
  );

  return listCategoriesController;
};
