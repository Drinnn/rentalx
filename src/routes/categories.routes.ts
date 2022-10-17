import { Router } from 'express';
import CategoriesRepository from '../modules/cars/repositories/categories.repository';
import { categoryController } from '../modules/cars/use-cases/create-category';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  return categoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  const categories = categoriesRepository.find();

  return res.json(categories);
});

export default categoriesRoutes;
