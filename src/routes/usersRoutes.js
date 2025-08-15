import { Router } from 'express';
import { createUser, listUsers, getUser, updateUser, deleteUser, listUserRecipes } from '../controllers/userController.js';

const router = Router();

router.post('/create', createUser);
router.get('/', listUsers);
router.get('/get/:id', getUser);
router.patch('/patch/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.get('/:id/recipes', listUserRecipes);

export default router;