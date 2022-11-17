import Rental from '@modules/rentals/infra/typeorm/entities/rentals.entity';
import IRentalsRepository from '@modules/rentals/repositories/rentals-repository.interface';
import { ICreateRentalUseCaseInputDto } from '@modules/rentals/use-cases/create-rental/create-rental.use-case';
import { getRepository, Repository } from 'typeorm';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  create(data: ICreateRentalUseCaseInputDto): Promise<Rental> {
    const { carId, userId, expectedReturnDate } = data;

    const rental = this.repository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    return this.repository.save(rental);
  }
  findByCar(carId: string): Promise<Rental> {
    return this.repository.findOne({ where: { carId, endDate: null } });
  }
  findByUser(userId: string): Promise<Rental> {
    return this.repository.findOne({ where: { userId, endDate: null } });
  }
}

export default RentalsRepository;
