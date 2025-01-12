// Question: Comment organiser le point d'entrée de l'application ?
// Réponse: Le point d'entrée de l'application doit initialiser les connexions aux bases de données, configurer les middlewares, monter les routes et démarrer le serveur.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse: C'est d'utiliser une fonction asynchrone pour gérer les connexions et les erreurs, et de s'assurer que toutes les ressources sont correctement fermées lors de l'arrêt.

const express = require("express");
const config = require("./config/env");
const db = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await db.connecterMongo();
    await db.connecterRedis();

    // Configurer les middlewares Express
    app.use(express.json());

    // Monter les routes
    app.use("/courses", courseRoutes);
    app.use("/students", studentRoutes);

    // Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Serveur démarré sur le port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  try {
    await db.fermerConnexions();
    console.log("Connexions fermées proprement");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la fermeture des connexions:", error);
    process.exit(1);
  }
});

startServer();
