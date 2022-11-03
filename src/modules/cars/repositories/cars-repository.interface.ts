import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import { ICreateCarUseCaseInputDto } from '@modules/cars/use-cases/create-car/create-car.use-case';

export interface ICarsRepository {
  create(data: ICreateCarUseCaseInputDto): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
}

export default ICarsRepository;
