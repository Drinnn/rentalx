import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload.config';
import ensureAuthenticated from '../middlewares/ensure-authenticated.middleware';
import CreateUserController from '../modules/accounts/use-cases/create-user/create-user.controller';
import UploadUserAvatarController from '../modules/accounts/use-cases/upload-user-avatar/upload-user-avatar.controller';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const uploadUserAvatarController = new UploadUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  uploadUserAvatarController.handle,
);

export default usersRoutes;
