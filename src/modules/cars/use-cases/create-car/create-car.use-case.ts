import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import AppError from '@shared/errors/app.error';
import { inject, injectable } from 'tsyringe';

export interface ICreateCarUseCaseInputDto {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
  ) {}

  public async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarUseCaseInputDto): Promise<Car> {
    const existingCar = await this.carsRepository.findByLicensePlate(
      licensePlate,
    );
    if (existingCar) {
      throw new AppError('Car already exists.');
    }

    const car = await this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return car;
  }
}

export default CreateCarUseCase;
