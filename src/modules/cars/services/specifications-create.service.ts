import ISpecificationsRepository from '../repositories/specifications-repository.interface';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const alreadyExistingSpecification =
      this.specificationsRepository.findByName(name);
    if (alreadyExistingSpecification) {
      throw new Error('Specification already exists.');
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export default CreateSpecificationService;
