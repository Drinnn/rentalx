import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../../repositories/users-repository.interface';

interface IUploadUserAvatarUseCaseInputDto {
  userId: string;
  avatarFileName: string;
}

@injectable()
export class UploadUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId,
    avatarFileName,
  }: IUploadUserAvatarUseCaseInputDto): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    user.avatar = avatarFileName;

    await this.usersRepository.update(user);
  }
}

export default UploadUserAvatarUseCase;
