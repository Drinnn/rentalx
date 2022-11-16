import User from '@modules/accounts/infra/typeorm/entities/user.entity';
import Car from '@modules/cars/infra/typeorm/entities/cars.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rentals')
export class Rental {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'car_id' })
  carId: string;

  @ManyToOne(() => Car, car => car.rentals)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.rentals)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'expected_return_date' })
  expectedReturnDate: Date;

  @Column()
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Rental;
