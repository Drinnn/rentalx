import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import { ICreateCarUseCaseInputDto } from '@modules/cars/use-cases/create-car/create-car.use-case';
import { IListAvailableCarsUseCaseInputDto } from '@modules/cars/use-cases/list-available-cars/list-available-cars.use-case';

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

  async findAllAvailables(
    params: IListAvailableCarsUseCaseInputDto,
  ): Promise<Car[]> {
    const { brand, name, categoryId } = params;

    if (brand || name || categoryId) {
      return this.cars.filter(car => {
        if (
          car.available === true &&
          ((brand && car.brand === brand) ||
            (name && car.name === name) ||
            (categoryId && car.categoryId === categoryId))
        ) {
          return car;
        }

        return null;
      });
    }

    return this.cars.filter(car => car.available === true);
  }
}

export default CarsInMemoryRepository;
