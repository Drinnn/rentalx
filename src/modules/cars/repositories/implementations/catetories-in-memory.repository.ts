import Category from '../../entities/category.entity';
import ICategoriesRepository, {
  ICreateCategoryDTO,
} from '../categories-repository.interface';

export class CategoriesInMemoryRepository implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async find(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }
}

export default CategoriesInMemoryRepository;
