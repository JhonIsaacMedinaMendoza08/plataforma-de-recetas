import { Router } from 'express';
import { createRecipe, listRecipes, getRecipe, updateRecipe, deleteRecipe, searchByIngredient } from '../controllers/recipeController.js';

const router = Router();

router.post('/create', createRecipe);
router.get('/get', listRecipes);
router.get('/search', searchByIngredient);
router.get('/getRecipe/:id', getRecipe);
router.patch('/patch/:id', updateRecipe);
router.delete('/delete/:id', deleteRecipe);

export default router;