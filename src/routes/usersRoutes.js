import { Router } from 'express';
import { createUser, listUsers, getUser, updateUser, deleteUser, listUserRecipes } from '../controllers/userController.js';

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/recipes', listUserRecipes);

export default router;