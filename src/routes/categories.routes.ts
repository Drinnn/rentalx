import { Router } from 'express';
import CategoriesRepository from '../repositories/categories.repository';
import CreateCategoryService from '../services/categories/categories-create.service';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  const categories = categoriesRepository.find();

  return res.json(categories);
});

export default categoriesRoutes;
