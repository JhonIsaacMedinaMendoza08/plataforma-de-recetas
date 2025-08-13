import { toObjectId } from '../utils/objectId.js'
import { addIngredientDAO, listIngredientsDAO, deleteIngredientDAO } from '../daos/recipesDao.js';


export const addIngredient = async (req, res) => {
    try {
        const recipeId = toObjectId(req.params.recipeId);
        if (!recipeId) return res.status(400).json({ message: 'recipeId inválido' });
        const { name } = req.body || {};
        if (!name) return res.status(400).json({ message: 'name es requerido' });
        const recipe = await addIngredientDAO(recipeId, name);
        if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
        return res.status(201).json(recipe);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const listIngredients = async (req, res) => {
    try {
        const recipeId = toObjectId(req.params.recipeId);
        if (!recipeId) return res.status(400).json({ message: 'recipeId inválido' });
        const rec = await listIngredientsDAO(recipeId);
        if (!rec) return res.status(404).json({ message: 'Receta no encontrada' });
        return res.json({ recipeId: rec._id, title: rec.title, ingredients: rec.ingredients || [] });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteIngredient = async (req, res) => {
    try {
        const recipeId = toObjectId(req.params.recipeId);
        const ingredientId = toObjectId(req.params.ingredientId);
        if (!recipeId || !ingredientId) return res.status(400).json({ message: 'ids inválidos' });
        const rec = await deleteIngredientDAO(recipeId, ingredientId);
        if (!rec) return res.status(404).json({ message: 'Receta no encontrada o ingrediente inexistente' });
        return res.json({ message: 'Ingrediente eliminado', ingredients: rec.ingredients });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};