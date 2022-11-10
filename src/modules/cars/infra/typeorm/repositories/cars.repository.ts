import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import { ICreateCarUseCaseInputDto } from '@modules/cars/use-cases/create-car/create-car.use-case';
import { IListAvailableCarsUseCaseInputDto } from '@modules/cars/use-cases/list-available-cars/list-available-cars.use-case';
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

  async update(car: Car): Promise<Car> {
    return this.repository.save(car);
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne({ where: { id } });
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ where: { licensePlate } });
  }

  async findAllAvailables(
    params: IListAvailableCarsUseCaseInputDto,
  ): Promise<Car[]> {
    const { brand, name, categoryId } = params;

    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('c.brand ILIKE :brand', { brand: `%${brand}%` });
    }

    if (name) {
      carsQuery.andWhere('c.name ILIKE :name', { name: `%${name}%` });
    }

    if (categoryId) {
      carsQuery.andWhere('c.category_id = :categoryId', { categoryId });
    }

    return carsQuery.getMany();
  }
}

export default CarsRepository;
