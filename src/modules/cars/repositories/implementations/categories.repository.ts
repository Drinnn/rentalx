import { getRepository, Repository } from 'typeorm';
import Category from '../../entities/category.entity';
import ICategoriesRepository, {
  ICreateCategoryDTO,
} from '../categories-repository.interface';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async find(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category> {
    return this.repository.findOne({ where: { name } });
  }
}

export default CategoriesRepository;
