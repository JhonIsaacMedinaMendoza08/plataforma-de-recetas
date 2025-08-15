import { Router } from 'express';
import { addIngredient, listIngredients, deleteIngredient } from '../controllers/ingredientController.js';

const router = Router({ mergeParams: true });

router.post('/post/:recipeId', addIngredient);
router.get('/get/:recipeId', listIngredients);
router.delete('/:recipeId/delete/:ingredientId', deleteIngredient);

export default router;

