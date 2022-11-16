import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('cars_images')
export class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'image_name' })
  imageName: string;

  @ManyToOne(() => Car, car => car.images)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default CarImage;
