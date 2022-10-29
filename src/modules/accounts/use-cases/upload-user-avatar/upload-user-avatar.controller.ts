import UploadUserAvatarUseCase from '@modules/accounts/use-cases/upload-user-avatar/upload-user-avatar.use-case';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UploadUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarFileName = req.file.filename;

    const uploadUserAvatarUseCase = container.resolve(UploadUserAvatarUseCase);

    await uploadUserAvatarUseCase.execute({ userId: id, avatarFileName });

    return res.status(204).send();
  }
}

export default UploadUserAvatarController;
