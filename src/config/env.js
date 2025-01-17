// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est impératif de valider les variables d'environnement au démarrage pour éviter des erreurs de configuration pendant l'execution du code
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Donc ce cas, l'application doit lever une erreur explicative et arrêter son exécution.

const dotenv = require("dotenv");
dotenv.config();

console.log("Environment variables loaded");

const requiredEnvVars = [
  "MONGODB_URI",
  "MONGODB_DB_NAME",
  "REDIS_URI",
  "REDIS_INSIGHT_HOST",
  "REDIS_INSIGHT_PORT",
  "PORT",
];

// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`La variable d'environnement ${varName} est manquante.`);
      throw new Error(`La variable d'environnement ${varName} est manquante.`);
    } else {
      console.log(`La variable d'environnement ${varName} est présente.`);
    }
  });
}

// Appeler la fonction de validation au démarrage
validateEnv();

console.log("Environment variables validated");

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME,
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
  port: process.env.PORT || 3000,
};
