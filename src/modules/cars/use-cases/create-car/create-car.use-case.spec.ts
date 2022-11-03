import CarsInMemoryRepository from '@modules/cars/repositories/cars-in-memory.repository';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import CreateCarUseCase from '@modules/cars/use-cases/create-car/create-car.use-case';

let carsInMemoryRepository: ICarsRepository;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsInMemoryRepository = new CarsInMemoryRepository();
    createCarUseCase = new CreateCarUseCase(carsInMemoryRepository);
  });

  it('should create a car', async () => {
    const car = {
      name: 'Car',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    };

    const result = await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      dailyRate: car.dailyRate,
      licensePlate: car.licensePlate,
      fineAmount: car.fineAmount,
      brand: car.brand,
      categoryId: car.categoryId,
    });

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(car.name);
    expect(result.description).toEqual(car.description);
    expect(result.dailyRate).toEqual(car.dailyRate);
    expect(result.licensePlate).toEqual(car.licensePlate);
    expect(result.fineAmount).toEqual(car.fineAmount);
    expect(result.brand).toEqual(car.brand);
    expect(result.categoryId).toEqual(car.categoryId);
  });

  it('should throw an error if car with same license plate already exists', async () => {
    const firstCar = {
      name: 'Car',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    };

    const secondCar = {
      name: 'Second Car',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    };

    await createCarUseCase.execute({
      name: firstCar.name,
      description: firstCar.description,
      dailyRate: firstCar.dailyRate,
      licensePlate: firstCar.licensePlate,
      fineAmount: firstCar.fineAmount,
      brand: firstCar.brand,
      categoryId: firstCar.categoryId,
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: secondCar.name,
        description: secondCar.description,
        dailyRate: secondCar.dailyRate,
        licensePlate: secondCar.licensePlate,
        fineAmount: secondCar.fineAmount,
        brand: secondCar.brand,
        categoryId: secondCar.categoryId,
      });
    }).rejects.toThrowError('Car already exists.');
  });

  it('should be available by default', async () => {
    const car = {
      name: 'Car',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    };

    const result = await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      dailyRate: car.dailyRate,
      licensePlate: car.licensePlate,
      fineAmount: car.fineAmount,
      brand: car.brand,
      categoryId: car.categoryId,
    });

    expect(result.available).toBe(true);
  });
});
