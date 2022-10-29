import ICategoriesRepository from '@modules/cars/repositories/categories-repository.interface';
import AppError from '@shared/errors/app.error';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const alreadyExistingCategory = await this.categoriesRepository.findByName(
      name,
    );
    if (alreadyExistingCategory) {
      throw new AppError('Category already exists.', 400);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
