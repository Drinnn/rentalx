import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../dtos/user-create.dto';
import User from '../../entities/user.entity';
import IUsersRepository from '../users-repository.interface';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
    driverLicence,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      driverLicence,
    });

    await this.repository.save(user);
  }
}

export default UsersRepository;
