import { toObjectId } from '../utils/objectId.js'
import { createUserDAO, listUsersDAO, getUserDAO, updateUserDAO, deleteUserDAO } from '../dataAccessObject/usersDao.js';
import { cascadeDeleteRecipesByUserDAO, listUserRecipesDAO } from '../dataAccessObject/recipesDao.js';

export const createUser = async (req, res) => {
    try {
        const { fullName, email } = req.body || {};
        if (!fullName || !email) return res.status(400).json({ message: 'fullName y email son requeridos' });
        const user = await createUserDAO({ fullName: fullName.trim(), email });
        return res.status(201).json(user);
    } catch (e) {
        if (e?.code === 11000) return res.status(409).json({ message: 'El email ya está registrado' });
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const listUsers = async (req, res) => {
    try {
        const users = await listUsersDAO();
        return res.json(users);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getUser = async (req, res) => {
    try {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: 'id inválido' });
        const user = await getUserDAO(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.json(user);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: 'id inválido' });
        const patch = {};
        if (req.body?.fullName) patch.fullName = req.body.fullName.trim();
        if (req.body?.email) patch.email = req.body.email.toLowerCase().trim();
        if (!Object.keys(patch).length) return res.status(400).json({ message: 'Nada para actualizar' });
        res.status(200).json({ message: 'Usuario Actualizado' });
        const user = await updateUserDAO(id, patch);

        return res.json(user);
    } catch (e) {
        if (e?.code === 11000) return res.status(409).json({ message: 'El email ya está registrado' });
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: 'id inválido' });
        const ok = await deleteUserDAO(id);
        if (!ok) return res.status(404).json({ message: 'Usuario no encontrado' });
        const deletedRecipes = await cascadeDeleteRecipesByUserDAO(id);
        return res.json({ message: 'Usuario eliminado', deletedRecipes });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const listUserRecipes = async (req, res) => {
    try {
        const id = toObjectId(req.params.id);
        if (!id) return res.status(400).json({ message: 'id inválido' });
        const recipes = await listUserRecipesDAO(id);
        return res.json(recipes);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};