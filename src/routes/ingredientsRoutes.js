import { Router } from 'express';
import { addIngredient, listIngredients, deleteIngredient } from '../controllers/ingredientController.js';

const router = Router({ mergeParams: true });

router.post('/:recipeId/ingredients', addIngredient);
router.get('/:recipeId/ingredients', listIngredients);
router.delete('/:recipeId/ingredients/:ingredientId', deleteIngredient);

export default router;