import CreateCategoryController from '@modules/cars/use-cases/create-category/create-category.controller';
import ImportCategoryController from '@modules/cars/use-cases/import-category/import-category.controller';
import ListCategoriesController from '@modules/cars/use-cases/list-categories/list-categories.controller';
import ensureAdmin from '@shared/infra/http/middlewares/ensure-admin.middleware';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated.middleware';
import { Router } from 'express';
import multer from 'multer';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle,
);

export default categoriesRoutes;
