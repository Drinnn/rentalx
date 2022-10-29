import ICreateUserDTO from '../../dtos/user-create.dto';
import User from '../../entities/user.entity';
import IUsersRepository from '../users-repository.interface';

export class UsersInMemoryRepository implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }

  async update(user: User): Promise<void> {
    const existingUser = this.users[this.users.indexOf(user)];

    Object.assign(existingUser, user);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
}

export default UsersInMemoryRepository;
