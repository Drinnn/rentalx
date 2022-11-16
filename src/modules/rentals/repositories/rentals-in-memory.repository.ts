import Rental from '@modules/rentals/infra/typeorm/entities/rentals.entity';
import IRentalsRepository from '@modules/rentals/repositories/rentals-repository.interface';
import { ICreateRentalUseCaseInputDto } from '@modules/rentals/use-cases/create-rental/create-rental.use-case';

export class RentalsInMemoryRepository implements IRentalsRepository {
  rentals: Rental[] = [];

  async create(data: ICreateRentalUseCaseInputDto): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, { ...data, startDate: new Date() });

    this.rentals.push(rental);

    return rental;
  }

  async findByCar(carId: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.carId === carId && !rental.endDate,
    );
  }

  async findByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.userId === userId && !rental.endDate,
    );
  }
}

export default RentalsInMemoryRepository;
