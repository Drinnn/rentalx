import ICategoriesRepository from '@modules/cars/repositories/categories-repository.interface';
import CategoriesInMemoryRepository from '@modules/cars/repositories/implementations/catetories-in-memory.repository';
import CreateCategoryUseCase from '@modules/cars/use-cases/create-category/create-category.use-case';

let categoriesInMemoryRepository: ICategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesInMemoryRepository = new CategoriesInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesInMemoryRepository,
    );
  });

  it('should create a category', async () => {
    const category = {
      name: 'SUV',
      description: 'Cars that are SUV',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const createdCategory = await categoriesInMemoryRepository.findByName(
      'SUV',
    );

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory.name).toEqual(category.name);
    expect(createdCategory.description).toEqual(category.description);
  });

  it('should not be able to create a category with existing name', async () => {
    expect(async () => {
      const category = {
        name: 'SUV',
        description: 'Cars that are SUV',
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toThrowError('Category already exists.');
  });
});
