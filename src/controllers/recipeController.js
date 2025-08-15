import { toObjectId } from '../utils/objectId.js'
import { getUserDAO } from '../dataAccessObject/usersDao.js';
import {
    createRecipeDAO, listRecipesDAO, getRecipeDAO,
    updateRecipeDAO, deleteRecipeDAO, searchByIngredientDAO
} from '../dataAccessObject/recipesDao.js';

export const createRecipe = async (req, res) => {
    try {
        const { userId, title, description } = req.body || {};
        const uid = toObjectId(userId);
        if (!uid || !title) return res.status(400).json({ message: 'userId y title son requeridos y válidos' });
        const user = await getUserDAO(uid);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        const recipe = await createRecipeDAO({ userId: uid, title, description });
        return res.status(201).json(recipe);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const listRecipes = async (req, res) => {
    try {
        const data = await listRecipesDAO();
        return res.json(data);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getRecipe = async (req, res) => {
    try {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: 'id inválido' });
        const recipe = await getRecipeDAO(id);
        if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
        return res.json(recipe);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: 'id inválido' });
        const patch = {};
        if (req.body?.title) patch.title = req.body.title.trim();
        if (req.body?.description !== undefined) patch.description = req.body.description?.trim() || '';
        if (!Object.keys(patch).length) return res.status(400).json({ message: 'Nada para actualizar' });
        const recipe = await updateRecipeDAO(id, patch);
            res.status(200).json({ message: "Receta actualizada Correctamente!!" });
            if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
        return res.json(recipe);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: 'id inválido' });
        const ok = await deleteRecipeDAO(id);
        if (!ok) return res.status(404).json({ message: 'Receta no encontrada' });
        return res.json({ message: 'Receta eliminada' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const searchByIngredient = async (req, res) => {
    try {
        const ingredient = (req.query.ingredient || '').trim();
        if (!ingredient) return res.status(400).json({ message: 'Parámetro "ingredient" es requerido' });
        const results = await searchByIngredientDAO(ingredient);
        return res.json(results);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};