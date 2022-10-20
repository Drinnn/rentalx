import { getRepository, Repository } from 'typeorm';
import Specification from '../../entities/specification.entity';
import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '../specifications-repository.interface';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ where: { name } });
  }
}

export default SpecificationsRepository;
