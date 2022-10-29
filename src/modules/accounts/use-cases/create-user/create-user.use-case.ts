import ICreateUserDTO from '@modules/accounts/dtos/user-create.dto';
import IUsersRepository from '@modules/accounts/repositories/users-repository.interface';
import AppError from '@shared/errors/app.error';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

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
      throw new AppError('User already exists.', 400);
    }

    const hashedPassword = await hash(data.password, 8);

    await this.usersRepository.create({ ...data, password: hashedPassword });
  }
}

export default CreateUserUseCase;
