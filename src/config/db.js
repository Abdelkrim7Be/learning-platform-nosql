// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Je pense que cela permet de centraliser la logique de connexion, de faciliter la maintenance et de réutiliser le code dans différentes parties de l'application.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour ce faire, il faut implémenter des fonctions de fermeture qui s'assurent que toutes les connexions sont correctement fermées avant que l'application ne se termine.

const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let clientMongo, clientRedis, db;

async function connecterMongo() {
  try {
    console.log(
      "Attempting to connect to MongoDB with URI:",
      config.mongodb.uri
    );
    clientMongo = new MongoClient(config.mongodb.uri);
    await clientMongo.connect();
    db = clientMongo.db(config.mongodb.dbName);
    console.log("Connected to MongoDB");
  } catch (erreur) {
    console.error("Failed to connect to MongoDB:", erreur);
    process.exit(1);
  }
}

async function connecterRedis() {
  try {
    clientRedis = redis.createClient({ url: config.REDIS_URI });
    clientRedis.on("error", (err) =>
      console.error("Erreur du client Redis", err)
    );
    await clientRedis.connect();
    console.log("Connecté à Redis");
  } catch (erreur) {
    console.error("Erreur de connexion à Redis :", erreur);
    process.exit(1);
  }
}

async function fermerConnexions() {
  try {
    if (clientMongo) {
      await clientMongo.close();
      console.log("MongoDB connection closed");
    }
    if (clientRedis) {
      await clientRedis.quit();
      console.log("Redis connection closed");
    }
  } catch (erreur) {
    console.error("Error closing connections:", erreur);
  }
}

// Export des fonctions et clients
module.exports = {
  connecterMongo,
  connecterRedis,
  fermerConnexions,
  obtenirDb: () => db,
  obtenirClientRedis: () => clientRedis,
};
