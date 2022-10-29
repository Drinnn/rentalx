import Category from '@modules/cars/infra/entities/category.entity';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  find(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export default ICategoriesRepository;
