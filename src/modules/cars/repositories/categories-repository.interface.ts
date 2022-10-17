import Category from '../models/category.model';

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
