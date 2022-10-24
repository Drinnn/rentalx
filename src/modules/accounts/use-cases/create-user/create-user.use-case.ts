import { hash } from 'bcrypt';
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
    const alreadyExistingUser = await this.usersRepository.findByEmail(
      data.email,
    );
    if (alreadyExistingUser) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await hash(data.password, 8);

    await this.usersRepository.create({ ...data, password: hashedPassword });
  }
}

export default CreateUserUseCase;
