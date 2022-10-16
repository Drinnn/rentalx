import Category from '../models/categories.model';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }

  find(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export default CategoriesRepository;
