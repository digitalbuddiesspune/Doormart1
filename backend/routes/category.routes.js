import { Router } from 'express';
import { getAllCategories, getNavCategoriesWithProducts } from '../controllers/category.controller.js';

const router = Router();

// Get all categories with subcategories (public endpoint)
router.get('/', getAllCategories);

// Nav: mains + subs that have products (public)
router.get('/nav-with-products', getNavCategoriesWithProducts);

export default router;







