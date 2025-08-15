import 'dotenv/config';
import { connectDB, closeDB } from './configDB.js';
import { ObjectId } from 'mongodb';

async function seed() {
    const db = await connectDB(process.env.MONGODB_URI, process.env.MONGODB_DBNAME);
    const users = db.collection('users');
    const recipes = db.collection('recipes');

    await Promise.all([
        users.deleteMany({}),
        recipes.deleteMany({})
    ]);

    const now = new Date();

    // 6 usuarios
    const { insertedIds } = await users.insertMany([
        { fullName: 'Juan Pérez', email: 'juan@example.com', createdAt: now, updatedAt: now },
        { fullName: 'Ana Gómez', email: 'ana@example.com', createdAt: now, updatedAt: now },
        { fullName: 'Carlos Ruiz', email: 'carlos@example.com', createdAt: now, updatedAt: now },
        { fullName: 'María López', email: 'maria@example.com', createdAt: now, updatedAt: now },
        { fullName: 'Pedro Sánchez', email: 'pedro@example.com', createdAt: now, updatedAt: now },
        { fullName: 'Lucía Torres', email: 'lucia@example.com', createdAt: now, updatedAt: now }
    ]);

    const juanId = insertedIds['0'];
    const anaId = insertedIds['1'];
    const carlosId = insertedIds['2'];
    const mariaId = insertedIds['3'];
    const pedroId = insertedIds['4'];
    const luciaId = insertedIds['5'];

    await recipes.insertMany([
        {
            user: juanId,
            title: 'Pollo al Horno',
            description: 'Pollo jugoso con especias',
            ingredients: [
                { _id: new ObjectId(), name: 'pollo' },
                { _id: new ObjectId(), name: 'ajo' },
                { _id: new ObjectId(), name: 'paprika' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: anaId,
            title: 'Ensalada Fresca',
            description: 'Lechuga, tomate y aguacate',
            ingredients: [
                { _id: new ObjectId(), name: 'lechuga' },
                { _id: new ObjectId(), name: 'tomate' },
                { _id: new ObjectId(), name: 'aguacate' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: carlosId,
            title: 'Pasta Carbonara',
            description: 'Pasta con huevo, queso y panceta',
            ingredients: [
                { _id: new ObjectId(), name: 'pasta' },
                { _id: new ObjectId(), name: 'huevo' },
                { _id: new ObjectId(), name: 'queso parmesano' },
                { _id: new ObjectId(), name: 'panceta' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: mariaId,
            title: 'Sopa de Verduras',
            description: 'Caldo de verduras con especias',
            ingredients: [
                { _id: new ObjectId(), name: 'zanahoria' },
                { _id: new ObjectId(), name: 'papa' },
                { _id: new ObjectId(), name: 'apio' },
                { _id: new ObjectId(), name: 'calabacín' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: pedroId,
            title: 'Arroz con Pollo',
            description: 'Arroz amarillo con trozos de pollo y verduras',
            ingredients: [
                { _id: new ObjectId(), name: 'arroz' },
                { _id: new ObjectId(), name: 'pollo' },
                { _id: new ObjectId(), name: 'pimiento rojo' },
                { _id: new ObjectId(), name: 'guisantes' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: luciaId,
            title: 'Tacos de Carne',
            description: 'Tortillas rellenas de carne sazonada',
            ingredients: [
                { _id: new ObjectId(), name: 'tortilla' },
                { _id: new ObjectId(), name: 'carne de res' },
                { _id: new ObjectId(), name: 'cebolla' },
                { _id: new ObjectId(), name: 'cilantro' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: juanId,
            title: 'Pizza Margarita',
            description: 'Pizza con salsa de tomate, mozzarella y albahaca',
            ingredients: [
                { _id: new ObjectId(), name: 'masa de pizza' },
                { _id: new ObjectId(), name: 'salsa de tomate' },
                { _id: new ObjectId(), name: 'mozzarella' },
                { _id: new ObjectId(), name: 'albahaca' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: anaId,
            title: 'Omelette de Espinaca',
            description: 'Huevo batido con espinaca y queso',
            ingredients: [
                { _id: new ObjectId(), name: 'huevo' },
                { _id: new ObjectId(), name: 'espinaca' },
                { _id: new ObjectId(), name: 'queso cheddar' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: carlosId,
            title: 'Hamburguesa Clásica',
            description: 'Pan, carne, lechuga, tomate y queso',
            ingredients: [
                { _id: new ObjectId(), name: 'pan de hamburguesa' },
                { _id: new ObjectId(), name: 'carne de res' },
                { _id: new ObjectId(), name: 'lechuga' },
                { _id: new ObjectId(), name: 'tomate' },
                { _id: new ObjectId(), name: 'queso cheddar' }
            ],
            createdAt: now,
            updatedAt: now
        },
        {
            user: luciaId,
            title: 'Ceviche de Pescado',
            description: 'Pescado marinado en limón con cebolla y cilantro',
            ingredients: [
                { _id: new ObjectId(), name: 'pescado' },
                { _id: new ObjectId(), name: 'limón' },
                { _id: new ObjectId(), name: 'cebolla morada' },
                { _id: new ObjectId(), name: 'cilantro' }
            ],
            createdAt: now,
            updatedAt: now
        }
    ]);

    console.log('✅ Dataset cargado con 6 usuarios y 10 recetas');
    await closeDB();
}

seed().catch((e) => { console.error(e); process.exit(1); });


//node src/config/dataset.js