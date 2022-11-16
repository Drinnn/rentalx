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
    throw new Error('Method not implemented.');
  }
  findByCar(carId: string): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
  findByUser(userId: string): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
}

export default RentalsRepository;
