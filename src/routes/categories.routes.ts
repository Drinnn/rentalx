import { Router } from 'express';
import CategoriesRepository from '../repositories/categories.repository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  categoriesRepository.create({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  const categories = categoriesRepository.list();

  return res.json(categories);
});

export default categoriesRoutes;
