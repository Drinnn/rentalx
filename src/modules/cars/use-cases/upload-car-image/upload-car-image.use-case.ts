import ICarsImagesRepository from '@modules/cars/repositories/cars-images-repository.interface';
import ICarsRepository from '@modules/cars/repositories/cars-repository.interface';
import AppError from '@shared/errors/app.error';
import { inject, injectable } from 'tsyringe';

export interface IUploadCarImageUseCaseInputDto {
  carId: string;
  imageNames: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute(dto: IUploadCarImageUseCaseInputDto): Promise<void> {
    const { carId, imageNames } = dto;

    const car = await this.carsRepository.findById(carId);
    if (!car) {
      throw new AppError('Car doesn´t exists.');
    }

    await Promise.all(
      imageNames.map(async imageName => {
        this.carsImagesRepository.create({ carId, imageName });
      }),
    );
  }
}

export default UploadCarImageUseCase;
