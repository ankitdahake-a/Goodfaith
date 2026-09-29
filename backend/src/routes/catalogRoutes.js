import { Router } from 'express';
import { getCatalog, getProductById, getCategories } from '../controllers/catalogController.js';

const router = Router();

router.get('/', getCatalog);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

export default router;
