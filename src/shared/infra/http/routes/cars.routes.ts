import { uploadConfig } from '@config/upload.config';
import CreateCarSpecificationsController from '@modules/cars/use-cases/create-car-specifications/create-car-specifications.controller';
import CreateCarController from '@modules/cars/use-cases/create-car/create-car.controller';
import ListAvailableCarsController from '@modules/cars/use-cases/list-available-cars/list-available-cars.controller';
import UploadCarImageController from '@modules/cars/use-cases/upload-car-image/upload-car-image.controller';
import ensureAdmin from '@shared/infra/http/middlewares/ensure-admin.middleware';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import { Router } from 'express';
import multer from 'multer';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationsController =
  new CreateCarSpecificationsController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);
carsRoutes.post(
  '/:id/images',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImageController.handle,
);
carsRoutes.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle,
);
carsRoutes.get('/available', listAvailableCarsController.handle);

export default carsRoutes;
