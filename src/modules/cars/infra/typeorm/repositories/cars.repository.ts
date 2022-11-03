import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import { ICreateCarUseCaseInputDto } from '@modules/cars/use-cases/create-car/create-car.use-case';
import { getRepository, Repository } from 'typeorm';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarUseCaseInputDto): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return this.repository.save(car);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ where: { licensePlate } });
  }
}

export default CarsRepository;
