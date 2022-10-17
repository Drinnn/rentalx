import Category from '../../models/category.model';
import ICategoriesRepository from '../../repositories/categories-repository.interface';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.find();

    return categories;
  }
}

export default ListCategoriesUseCase;
