import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/configDB.js';
import usersRouter from './src/routes/usersRoutes.js';
import recipesRouter from './src/routes/recipesRoutes.js';
import ingredientsRouter from './src/routes/ingredientsRoutes.js';
import { notFound } from './src/middlewares/notFound.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/recipes', ingredientsRouter);

app.use(notFound);

const PORT = process.env.PORT || 4000;

(async () => {
    await connectDB(process.env.MONGODB_URI, process.env.MONGODB_DBNAME);
    app.listen(PORT, () => console.log(`🚀 API escuchando en http://localhost:${PORT}`));
})();