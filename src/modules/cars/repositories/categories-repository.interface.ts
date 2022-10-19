import Category from '../entites/category.entity';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  find(): Category[];
  findByName(name: string): Category;
}

export default ICategoriesRepository;
