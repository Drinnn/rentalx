import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import { inject, injectable } from 'tsyringe';

export interface IListAvailableCarsUseCaseInputDto {
  brand: string;
  name: string;
  categoryId: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository') private readonly carsRepository: ICarsRepository,
  ) {}

  async execute(dto: IListAvailableCarsUseCaseInputDto): Promise<Car[]> {
    return this.carsRepository.findAllAvailables(dto);
  }
}

export default ListAvailableCarsUseCase;
