import Rental from '@modules/rentals/infra/typeorm/entities/rentals.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'driver_licence' })
  driverLicence: string;

  @Column()
  admin: boolean;

  @Column()
  avatar: string;

  @OneToMany(() => Rental, rental => rental.user)
  rentals: Rental[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default User;
