import Category from '../../entities/category.entity';
import ICategoriesRepository from '../../repositories/categories-repository.interface';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}

export default ListCategoriesUseCase;
