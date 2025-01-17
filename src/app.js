require("dotenv").config({ path: "./src/.env" }); // Update the path to .env
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/env");
const mongoService = require("./services/mongoService");

const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await mongoService.connectDB();

    // Configurer les middlewares Express
    app.use(bodyParser.json());

    // Monter les routes
    app.use("/courses", courseRoutes);
    app.use("/api", studentRoutes);

    // Démarrer le serveur
    app.listen(process.env.PORT || config.port, () => {
      console.log("Server is running...");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  try {
    await mongoService.client.close();
    console.log("Connexions fermées proprement");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la fermeture des connexions:", error);
    process.exit(1);
  }
});

startServer();
