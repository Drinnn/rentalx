import Specification from '@modules/cars/infra/typeorm/entities/specification.entity';
import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/specifications-repository.interface';

export class SpecificationsInMemoryRepository
  implements ISpecificationsRepository
{
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification => {
      if (ids.includes(specification.id)) {
        return specification;
      }

      return null;
    });
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }
}

export default SpecificationsInMemoryRepository;
