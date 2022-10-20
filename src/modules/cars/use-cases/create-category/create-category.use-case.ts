import ICategoriesRepository from '../../repositories/categories-repository.interface';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const alreadyExistingCategory = await this.categoriesRepository.findByName(
      name,
    );
    if (alreadyExistingCategory) {
      throw new Error('Category already exists.');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
