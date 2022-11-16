import Rental from '@modules/rentals/infra/typeorm/entities/rentals.entity';
import { ICreateRentalUseCaseInputDto } from '@modules/rentals/use-cases/create-rental/create-rental.use-case';

export interface IRentalsRepository {
  create(data: ICreateRentalUseCaseInputDto): Promise<Rental>;
  findByCar(carId: string): Promise<Rental>;
  findByUser(userId: string): Promise<Rental>;
}

export default IRentalsRepository;
