import ICarsImagesRepository from '@modules/cars/repositories/cars-images-repository.interface';
import { inject, injectable } from 'tsyringe';

export interface IUploadCarImageUseCaseInputDto {
  carId: string;
  imageNames: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute(dto: IUploadCarImageUseCaseInputDto): Promise<void> {
    const { carId, imageNames } = dto;

    await Promise.all(
      imageNames.map(async imageName => {
        this.carsImagesRepository.create({ carId, imageName });
      }),
    );
  }
}

export default UploadCarImageUseCase;
