import { inject, injectable } from 'tsyringe';
import AppError from '../../../../errors/app.error';
import ICategoriesRepository from '../../repositories/categories-repository.interface';

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
