import CarsInMemoryRepository from '@modules/cars/repositories/cars-in-memory.repository';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import ListAvailableCarsUseCase from '@modules/cars/use-cases/list-available-cars/list-available-cars.use-case';

let carsInMemoryRepository: ICarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Available Cars', () => {
  beforeEach(() => {
    carsInMemoryRepository = new CarsInMemoryRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsInMemoryRepository,
    );
  });

  it('should list all available cars', async () => {
    const car1 = await carsInMemoryRepository.create({
      name: 'Car 1',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });
    const car2 = await carsInMemoryRepository.create({
      name: 'Car 2',
      description: 'Another cool car',
      dailyRate: 60,
      licensePlate: 'LCP-321',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });

    const result = await listAvailableCarsUseCase.execute({
      brand: null,
      name: null,
      categoryId: null,
    });

    expect(result).toEqual([car1, car2]);
  });

  it('should list all available cars by brand', async () => {
    const car1 = await carsInMemoryRepository.create({
      name: 'Car 1',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });
    await carsInMemoryRepository.create({
      name: 'Car 2',
      description: 'Another cool car',
      dailyRate: 60,
      licensePlate: 'LCP-321',
      fineAmount: 120,
      brand: 'Cool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });

    const result = await listAvailableCarsUseCase.execute({
      brand: 'Kool Brand',
      name: null,
      categoryId: null,
    });

    expect(result).toEqual([car1]);
  });

  it('should list all available cars by name', async () => {
    await carsInMemoryRepository.create({
      name: 'Car 1',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });
    const car2 = await carsInMemoryRepository.create({
      name: 'Car 2',
      description: 'Another cool car',
      dailyRate: 60,
      licensePlate: 'LCP-321',
      fineAmount: 120,
      brand: 'Cool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });

    const result = await listAvailableCarsUseCase.execute({
      brand: null,
      name: 'Car 2',
      categoryId: null,
    });

    expect(result).toEqual([car2]);
  });

  it('should list all available cars by category id', async () => {
    const car1 = await carsInMemoryRepository.create({
      name: 'Car 1',
      description: 'A cool car',
      dailyRate: 60,
      licensePlate: 'LCP-123',
      fineAmount: 120,
      brand: 'Kool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2b',
    });
    await carsInMemoryRepository.create({
      name: 'Car 2',
      description: 'Another cool car',
      dailyRate: 60,
      licensePlate: 'LCP-321',
      fineAmount: 120,
      brand: 'Cool Brand',
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2a',
    });

    const result = await listAvailableCarsUseCase.execute({
      brand: null,
      name: null,
      categoryId: '66775b52-f6f1-4ab2-9b7c-a38af9c82f2b',
    });

    expect(result).toEqual([car1]);
  });
});
