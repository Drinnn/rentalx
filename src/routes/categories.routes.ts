import { Router } from 'express';
import Category from '../models/category.model';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const category = new Category();
  Object.assign(category, {
    name,
    description,
    createdAt: new Date(),
  });

  categories.push(category);

  return res.status(201).json(category);
});

export default categoriesRoutes;
