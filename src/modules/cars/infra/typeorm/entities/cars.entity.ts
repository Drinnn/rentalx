import Category from '@modules/cars/infra/typeorm/entities/category.entity';
import Specification from '@modules/cars/infra/typeorm/entities/specification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('cars')
export class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'daily_rate' })
  dailyRate: number;

  @Column()
  available: boolean;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @Column({ name: 'fine_amount' })
  fineAmount: number;

  @Column()
  brand: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => Category, category => category.cars)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumn: { name: 'car_id' },
    inverseJoinColumn: { name: 'specification_id' },
  })
  specifications: Specification[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.available = true;
  }
}

export default Car;
