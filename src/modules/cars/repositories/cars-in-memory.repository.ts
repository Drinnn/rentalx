import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import { ICreateCarUseCaseInputDto } from '@modules/cars/use-cases/create-car/create-car.use-case';

export class CarsInMemoryRepository implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarUseCaseInputDto): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }
}

export default CarsInMemoryRepository;
