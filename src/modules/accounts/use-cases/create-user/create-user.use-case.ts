import { inject, injectable } from 'tsyringe';
import ICreateUserDTO from '../../dtos/user-create.dto';
import IUsersRepository from '../../repositories/users-repository.interface';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create(data);
  }
}

export default CreateUserUseCase;
