import ICreateUserDTO from '../dtos/user-create.dto';
import User from '../entities/user.entity';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export default IUsersRepository;
