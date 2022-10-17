import ICategoriesRepository from '../../repositories/categories-repository.interface';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const alreadyExistingCategory = this.categoriesRepository.findByName(name);
    if (alreadyExistingCategory) {
      throw new Error('Category already exists.');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
