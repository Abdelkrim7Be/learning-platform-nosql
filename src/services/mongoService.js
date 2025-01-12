// Question: Pourquoi créer des services séparés ?
// Réponse: Assurer la modularité du code et une facilité des tests.

const { ObjectId } = require("mongodb");
const db = require("../config/db").obtenirDb();

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  try {
    const result = await db
      .collection(collection)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Erreur lors de la recherche par ID:", error);
    return null;
  }
}

async function insertOne(collection, document) {
  try {
    const result = await db.collection(collection).insertOne(document);
    return result;
  } catch (error) {
    console.error("Erreur lors de l'insertion du document:", error);
    return null;
  }
}

// Export des services
module.exports = {
  findOneById,
  insertOne,
};
