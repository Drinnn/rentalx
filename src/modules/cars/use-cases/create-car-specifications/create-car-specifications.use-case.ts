import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import ISpecificationsRepository from '@modules/cars/repositories/specifications-repository.interface';
import AppError from '@shared/errors/app.error';
import { inject, injectable } from 'tsyringe';

export interface ICreateCarSpecificationUseCaseInputDto {
  carId: string;
  specificationIds: string[];
}

@injectable()
export class CreateCarSpecificationsUseCase {
  constructor(
    @inject('CarsRepository') private readonly carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(dto: ICreateCarSpecificationUseCaseInputDto): Promise<Car> {
    const { carId, specificationIds } = dto;

    const car = await this.carsRepository.findById(carId);
    if (!car) {
      throw new AppError('Car doesn´t exists.');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationIds,
    );
    if (specifications.length !== specificationIds.length) {
      throw new AppError('One of the given specifications doesn´t exists.');
    }

    car.specifications = specifications;

    return this.carsRepository.update(car);
  }
}

export default CreateCarSpecificationsUseCase;
