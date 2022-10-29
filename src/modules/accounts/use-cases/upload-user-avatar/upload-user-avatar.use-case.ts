import IUsersRepository from '@modules/accounts/repositories/users-repository.interface';
import { deleteFile } from '@utils/file';
import { inject, injectable } from 'tsyringe';

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

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatarFileName;

    await this.usersRepository.update(user);
  }
}

export default UploadUserAvatarUseCase;
