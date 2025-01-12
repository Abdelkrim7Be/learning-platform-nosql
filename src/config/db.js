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
    clientMongo = new MongoClient(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await clientMongo.connect();
    db = clientMongo.db(config.MONGODB_DB_NAME);
    console.log("Connecté à MongoDB");
  } catch (erreur) {
    console.error("Erreur de connexion à MongoDB :", erreur);
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
      console.log("Connexion MongoDB fermée");
    }
    if (clientRedis) {
      await clientRedis.quit();
      console.log("Connexion Redis fermée");
    }
  } catch (erreur) {
    console.error("Erreur lors de la fermeture des connexions :", erreur);
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
