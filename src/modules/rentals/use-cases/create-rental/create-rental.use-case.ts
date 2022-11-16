import Rental from '@modules/rentals/infra/typeorm/entities/rentals.entity';
import IRentalsRepository from '@modules/rentals/repositories/rentals-repository.interface';
import AppError from '@shared/errors/app.error';
import { inject, injectable } from 'tsyringe';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import IDateProvider from '@shared/container/providers/date-provider/date-provider.interface';

dayjs.extend(utc);

export interface ICreateRentalUseCaseInputDto {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

@injectable()
export class CreateRentalUseCase {
  readonly MIN_RENTAL_HOURS = 24;

  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DayJsDateProvider')
    private readonly dateProvider: IDateProvider,
  ) {}

  async execute(dto: ICreateRentalUseCaseInputDto): Promise<Rental> {
    const { carId, userId, expectedReturnDate } = dto;

    const carAlreadyRented = await this.rentalsRepository.findByCar(carId);
    if (carAlreadyRented) {
      throw new AppError('Car isn´t available.');
    }

    const userAlreadyRented = await this.rentalsRepository.findByUser(userId);
    if (userAlreadyRented) {
      throw new AppError('User isn´t available.');
    }

    this.checkDate(expectedReturnDate);

    return this.rentalsRepository.create({ carId, userId, expectedReturnDate });
  }

  checkDate(expectedReturnDate: Date): void {
    const compare = this.dateProvider.compareInHours(
      this.dateProvider.now(),
      expectedReturnDate,
    );

    if (compare < this.MIN_RENTAL_HOURS) {
      throw new AppError('Rental must have at least a 24h duration');
    }
  }
}

export default CreateRentalUseCase;
