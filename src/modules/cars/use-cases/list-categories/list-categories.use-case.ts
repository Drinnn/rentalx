import Category from '@modules/cars/entities/category.entity';
import ICategoriesRepository from '@modules/cars/repositories/categories-repository.interface';
import { inject, injectable } from 'tsyringe';

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
