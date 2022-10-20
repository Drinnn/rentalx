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

  execute({ name, description }: IRequest): void {
    const alreadyExistingSpecification =
      this.specificationsRepository.findByName(name);
    if (alreadyExistingSpecification) {
      throw new Error('Specification already exists.');
    }

    this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
