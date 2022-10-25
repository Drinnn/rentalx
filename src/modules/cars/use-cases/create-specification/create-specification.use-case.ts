import { inject, injectable } from 'tsyringe';
import AppError from '../../../../errors/app.error';
import ISpecificationsRepository from '../../repositories/specifications-repository.interface';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const alreadyExistingSpecification =
      await this.specificationsRepository.findByName(name);
    if (alreadyExistingSpecification) {
      throw new AppError('Specification already exists.', 400);
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
