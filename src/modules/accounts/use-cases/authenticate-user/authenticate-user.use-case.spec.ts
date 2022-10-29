import ICreateUserDTO from '@modules/accounts/dtos/user-create.dto';
import UsersInMemoryRepository from '@modules/accounts/repositories/users-in-memory.repository';
import IUsersRepository from '@modules/accounts/repositories/users-repository.interface';
import AuthenticateUserUseCase from '@modules/accounts/use-cases/authenticate-user/authenticate-user.use-case';
import CreateUserUseCase from '@modules/accounts/use-cases/create-user/create-user.use-case';

describe('Authenticate User', () => {
  let usersInMemoryRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(() => {
    process.env.JWT_SECRET = 'top_secret';
    usersInMemoryRepository = new UsersInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(usersInMemoryRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersInMemoryRepository,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      driverLicence: 'DRV-L-123',
      password: 'verysecure',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: 'johndoe@mail.com',
      password: 'verysecure',
    });

    expect(result).toHaveProperty('token');
    expect(result.user.name).toEqual('John Doe');
    expect(result.user.email).toEqual('johndoe@mail.com');
  });

  it('should not be able to authenticate an unexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'johndoe@mail.com',
        password: 'verysecure',
      });
    }).rejects.toThrowError('Invalid credentials.');
  });

  it('should not be able to authenticate user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      driverLicence: 'DRV-L-123',
      password: 'verysecure',
    };

    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'johndoe@mail.com',
        password: 'idk123',
      });
    }).rejects.toThrowError('Invalid credentials.');
  });
});
