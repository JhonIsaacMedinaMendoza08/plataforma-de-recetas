import { getDB } from "../config/configDB.js";
import { ObjectId } from "mongodb";

const recipes = () => getDB().collection("recipes");

export async function createRecipeDAO({ userId, title, description }) {
    const now = new Date();
    const doc = {
        user: new ObjectId(userId),
        title: title.trim(),
        description: description?.trim() || "",
        ingredients: [],
        createdAt: now,
        updatedAt: now,
    };
    const { insertedId } = await recipes().insertOne(doc);
    return { _id: insertedId, ...doc };
}

export async function listRecipesDAO() {
    return recipes().aggregate([
        { $sort: { createdAt: -1 } },
        { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        { $project: { 'user.email': 1, 'user.fullName': 1, title: 1, description: 1, ingredients: 1, createdAt: 1, updatedAt: 1 } }
    ]).toArray();
}

export async function getRecipeDAO(id) {
    const _id = new ObjectId(id);
    return recipes().aggregate([
        { $match: { _id } },
        { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        { $project: { 'user.email': 1, 'user.fullName': 1, title: 1, description: 1, ingredients: 1, createdAt: 1, updatedAt: 1 } }
    ]).next();
}

export async function updateRecipeDAO(id, patch) {
    patch.updatedAt = new Date();
    const { value } = await recipes().findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: patch },
        { returnDocument: 'after' }
    );
    return value;
}

export async function deleteRecipeDAO(id) {
    const { deletedCount } = await recipes().deleteOne({ _id: new ObjectId(id) });
    return deletedCount === 1;
}

export async function listUserRecipesDAO(userId) {
    return recipes().find({ user: new ObjectId(userId) }).sort({ createdAt: -1 }).toArray();
}

export async function addIngredientDAO(recipeId, name) {
    const ing = { _id: new ObjectId(), name: name.toLowerCase().trim() };
    const { value } = await recipes().findOneAndUpdate(
        { _id: new ObjectId(recipeId) },
        { $push: { ingredients: ing }, $set: { updatedAt: new Date() } },
        { returnDocument: 'after' }
    );
    return value;
}

export async function listIngredientsDAO(recipeId) {
    const rec = await recipes().findOne({ _id: new ObjectId(recipeId) }, { projection: { title: 1, ingredients: 1 } });
    return rec;
}

export async function deleteIngredientDAO(recipeId, ingredientId) {
    const { value } = await recipes().findOneAndUpdate(
        { _id: new ObjectId(recipeId) },
        { $pull: { ingredients: { _id: new ObjectId(ingredientId) } }, $set: { updatedAt: new Date() } },
        { returnDocument: 'after' }
    );
    return value;
}

export async function searchByIngredientDAO(term) {
    const ingredient = term.toLowerCase().trim();
    return recipes().aggregate([
        { $match: { 'ingredients.name': ingredient } },
        { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        { $project: { title: 1, description: 1, ingredients: 1, 'user.fullName': 1 } }
    ]).toArray();
}

export async function cascadeDeleteRecipesByUserDAO(userId) {
    const { deletedCount } = await recipes().deleteMany({ user: new ObjectId(userId) });
    return deletedCount;
}