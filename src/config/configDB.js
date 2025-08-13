import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client; 
let db;

export async function connectDB(uri, dbName) {
    if (!uri) throw new Error('MONGODB_URI no definido');
    if (!dbName) throw new Error('MONGODB_DBNAME no definido');
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);

    await Promise.all([
        db.collection('users').createIndex({ email: 1 }, { unique: true }),
        db.collection('recipes').createIndex({ user: 1 }),
        db.collection('recipes').createIndex({ 'ingredients.name': 1 })
    ]);
    console.log('✅ MongoDB conectado');
    return db;
}

export function getDB() {
    if (!db) throw new Error('DB no inicializada. Llama a connectDB primero.');
    return db;
}

export async function closeDB() {
    if (client) await client.close();
    client = undefined; db = undefined;
}