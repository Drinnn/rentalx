import CarsInMemoryRepository from '@modules/cars/repositories/cars-in-memory.repository';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import SpecificationsInMemoryRepository from '@modules/cars/repositories/specifications-in-memory.repository';
import ISpecificationsRepository from '@modules/cars/repositories/specifications-repository.interface';
import CreateCarSpecificationsUseCase from '@modules/cars/use-cases/create-car-specifications/create-car-specifications.use-case';

let carsInMemoryRepository: ICarsRepository;
let specificationsInMemoryRepository: ISpecificationsRepository;
let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;

describe('Create Car Specifications', () => {
  beforeAll(() => {
    carsInMemoryRepository = new CarsInMemoryRepository();
    specificationsInMemoryRepository = new SpecificationsInMemoryRepository();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsInMemoryRepository,
      specificationsInMemoryRepository,
    );
  });

  it('should be able to create specifications for a car', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'Car',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });
    const specification1 = await specificationsInMemoryRepository.create({
      name: 'Air Bag',
      description: 'Safety in first place',
    });
    const specification2 = await specificationsInMemoryRepository.create({
      name: 'Air Conditioner',
      description: 'Keep you cool',
    });

    const result = await createCarSpecificationsUseCase.execute({
      carId: car.id,
      specificationIds: [specification1.id, specification2.id],
    });

    expect(result).toEqual({
      ...car,
      specifications: [specification1, specification2],
    });
  });

  it('should not be able to create a specification for unexistent car', async () => {
    expect(async () => {
      await createCarSpecificationsUseCase.execute({
        carId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
        specificationIds: [
          '66775b52-f6f1-4ab2-9b7c-a38af9c82f2b',
          '66775b52-f6f1-4ab2-9b7c-a38af9c82f2c',
        ],
      });
    }).rejects.toThrowError('Car doesn´t exists.');
  });

  it('should not be able to create a specification for unexistent specification', async () => {
    const car = await carsInMemoryRepository.create({
      name: 'Car',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });
    const specification = await specificationsInMemoryRepository.create({
      name: 'Air Bag',
      description: 'Safety in first place',
    });

    expect(async () => {
      await createCarSpecificationsUseCase.execute({
        carId: car.id,
        specificationIds: [
          specification.id,
          '66775b52-f6f1-4ab2-9b7c-a38af9c82f2c',
        ],
      });
    }).rejects.toThrowError('One of the given specifications doesn´t exists.');
  });
});
