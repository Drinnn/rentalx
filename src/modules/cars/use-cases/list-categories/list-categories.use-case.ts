import { inject, injectable } from 'tsyringe';
import Category from '../../entities/category.entity';
import ICategoriesRepository from '../../repositories/categories-repository.interface';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}

export default ListCategoriesUseCase;
