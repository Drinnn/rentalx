import ICreateUserDTO from '../dtos/user-create.dto';
import User from '../entities/user.entity';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export default IUsersRepository;
