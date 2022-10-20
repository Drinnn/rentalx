import { inject, injectable } from 'tsyringe';
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
      throw new Error('Specification already exists.');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
