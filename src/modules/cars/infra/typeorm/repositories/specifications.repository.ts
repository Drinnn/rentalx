import Specification from '@modules/cars/infra/typeorm/entities/specification.entity';
import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/specifications-repository.interface';
import { getRepository, Repository } from 'typeorm';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    return this.repository.save(specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ where: { name } });
  }
}

export default SpecificationsRepository;
