import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import { ICreateCarUseCaseInputDto } from '@modules/cars/use-cases/create-car/create-car.use-case';
import { IListAvailableCarsUseCaseInputDto } from '@modules/cars/use-cases/list-available-cars/list-available-cars.use-case';

export interface ICarsRepository {
  create(data: ICreateCarUseCaseInputDto): Promise<Car>;
  update(car: Car): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAllAvailables(params: IListAvailableCarsUseCaseInputDto): Promise<Car[]>;
}

export default ICarsRepository;
