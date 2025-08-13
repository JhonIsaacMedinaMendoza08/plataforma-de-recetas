import 'dotenv/config';
import { connectDB, closeDB } from './configDB.js';

async function seed() {
    const db = await connectDB(process.env.MONGODB_URI, process.env.MONGODB_DBNAME);
    const users = db.collection('users');
    const recipes = db.collection('recipes');

    await Promise.all([
        users.deleteMany({}),
        recipes.deleteMany({})
    ]);

    const now = new Date();
    const { insertedIds } = await users.insertMany([
        { fullName: 'Juan Pérez', email: 'juan@example.com', createdAt: now, updatedAt: now },
        { fullName: 'Ana Gómez', email: 'ana@example.com', createdAt: now, updatedAt: now }
    ]);

    const juanId = insertedIds['0'];
    const anaId = insertedIds['1'];

    await recipes.insertMany([
        {
            user: juanId,
            title: 'Pollo al Horno',
            description: 'Pollo jugoso con especias',
            ingredients: [{ name: 'pollo' }, { name: 'ajo' }, { name: 'paprika' }],
            createdAt: now,
            updatedAt: now
        },
        {
            user: anaId,
            title: 'Ensalada Fresca',
            description: 'Lechuga, tomate y aguacate',
            ingredients: [{ name: 'lechuga' }, { name: 'tomate' }, { name: 'aguacate' }],
            createdAt: now,
            updatedAt: now
        }
    ]);

    console.log('✅ Dataset cargado');
    await closeDB();
}

seed().catch((e) => { console.error(e); process.exit(1); });