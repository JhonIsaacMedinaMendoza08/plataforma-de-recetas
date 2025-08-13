import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

// función que devuelve la referencia a la colección users. si un día cambiamos el nombre de la colección, solo se cambia aquí.
const coll = () => getDB().collection('users');

export async function createUserDAO({ fullName, email }) {
    const now = new Date();
    const doc = { fullName, email: email.toLowerCase().trim(), createdAt: now, updatedAt: now };
    const { insertedId } = await coll().insertOne(doc);
    return { _id: insertedId, ...doc };
}

export async function listUsersDAO() {
    return coll().find().sort({ createdAt: -1 }).toArray();
}

export async function getUserDAO(id) {
    return coll().findOne({ _id: new ObjectId(id) });
}

export async function updateUserDAO(id, patch) {
    patch.updatedAt = new Date();
    const { value } = await coll().findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: patch },
        { returnDocument: 'after' }
        // Devuelve el documento ya actualizado (returnDocument: 'after').
    );
    return value;
}

export async function deleteUserDAO(id) {
    const { deletedCount } = await coll().deleteOne({ _id: new ObjectId(id) });
    return deletedCount === 1;
}