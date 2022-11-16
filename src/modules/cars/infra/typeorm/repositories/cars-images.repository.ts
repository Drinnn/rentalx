import CarImage from '@modules/cars/infra/typeorm/entities/car-image.entity';
import ICarsImagesRepository from '@modules/cars/repositories/cars-images-repository.interface';
import { getRepository, Repository } from 'typeorm';

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create(data: { carId: string; imageName: string }): Promise<CarImage> {
    const { carId, imageName } = data;

    const carImage = this.repository.create({
      carId,
      imageName,
    });

    return this.repository.save(carImage);
  }
}

export default CarsImagesRepository;
