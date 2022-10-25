import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../../errors/app.error';
import IUsersRepository from '../../repositories/users-repository.interface';

interface IAuthenticateUserInputDto {
  email: string;
  password: string;
}

interface IAuthenticateUserOutputDto {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserInputDto): Promise<IAuthenticateUserOutputDto> {
    const existingUser = await this.usersRepository.findByEmail(email);
    if (!existingUser) {
      throw new AppError('Invalid credentials.', 401);
    }

    const matchingPassword = await compare(password, existingUser.password);
    if (!matchingPassword) {
      throw new AppError('Invalid credentials.', 401);
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: existingUser.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    };
  }
}

export default AuthenticateUserUseCase;
