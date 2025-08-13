import { Router } from 'express';
import { createRecipe, listRecipes, getRecipe, updateRecipe, deleteRecipe, searchByIngredient } from '../controllers/recipeController.js';

const router = Router();

router.post('/', createRecipe);
router.get('/', listRecipes);
router.get('/search', searchByIngredient);
router.get('/:id', getRecipe);
router.patch('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;