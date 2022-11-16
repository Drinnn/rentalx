import dayjs from 'dayjs';
import RentalsInMemoryRepository from '@modules/rentals/repositories/rentals-in-memory.repository';
import IRentalsRepository from '@modules/rentals/repositories/rentals-repository.interface';
import CreateRentalUseCase from '@modules/rentals/use-cases/create-rental/create-rental.use-case';
import IDateProvider from '@shared/container/providers/date-provider/date-provider.interface';
import DayJsDateProvider from '@shared/container/providers/date-provider/implementations/dayjs.date-provider';

let rentalsInMemoryRepository: IRentalsRepository;
let dateProvider: IDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsInMemoryRepository = new RentalsInMemoryRepository();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsInMemoryRepository,
      dateProvider,
    );
  });

  it('should be able to create a rental', async () => {
    const rental = {
      carId: 'carId',
      userId: 'userId',
      expectedReturnDate: dayjs().add(2, 'days').toDate(),
    };

    const result = await createRentalUseCase.execute({
      carId: rental.carId,
      userId: rental.userId,
      expectedReturnDate: rental.expectedReturnDate,
    });

    expect(result.id).toBeDefined();
    expect(result.carId).toBe(rental.carId);
    expect(result.userId).toBe(rental.userId);
    expect(result.expectedReturnDate).toBe(rental.expectedReturnDate);
  });

  it('should throw error if car is already rented', async () => {
    await rentalsInMemoryRepository.create({
      carId: 'car_id',
      userId: 'user_id',
      expectedReturnDate: new Date(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        carId: 'car_id',
        userId: 'user_id',
        expectedReturnDate: new Date(),
      });
    }).rejects.toThrowError('Car isn´t available.');
  });

  it('should throw error if user is already renting another car', async () => {
    await rentalsInMemoryRepository.create({
      carId: 'car_id',
      userId: 'user_id',
      expectedReturnDate: new Date(),
    });

    expect(async () => {
      await createRentalUseCase.execute({
        carId: 'another_car_id',
        userId: 'user_id',
        expectedReturnDate: new Date(),
      });
    }).rejects.toThrowError('User isn´t available.');
  });

  it('should throw error if rental duration is lesser than 24h', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        carId: 'car_id',
        userId: 'user_id',
        expectedReturnDate: dayjs().add(2, 'hours').toDate(),
      });
    }).rejects.toThrowError('Rental must have at least a 24h duration');
  });
});
