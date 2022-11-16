import CarImage from '@modules/cars/infra/typeorm/entities/car-image.entity';

export interface ICarsImagesRepository {
  create(data: { carId: string; imageName: string }): Promise<CarImage>;
}

export default ICarsImagesRepository;
