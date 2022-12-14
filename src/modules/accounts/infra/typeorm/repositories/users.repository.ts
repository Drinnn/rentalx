import ICreateUserDTO from '@modules/accounts/dtos/user-create.dto';
import User from '@modules/accounts/infra/typeorm/entities/user.entity';
import IUsersRepository from '@modules/accounts/repositories/users-repository.interface';
import { getRepository, Repository } from 'typeorm';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driverLicence,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driverLicence,
    });

    await this.repository.save(user);
  }

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }
}

export default UsersRepository;
