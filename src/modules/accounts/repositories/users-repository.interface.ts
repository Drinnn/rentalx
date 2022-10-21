import ICreateUserDTO from '../dtos/user-create.dto';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export default IUsersRepository;
