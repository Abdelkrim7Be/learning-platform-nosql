// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Une route définit les URL et les méthodes HTTP, alors qu'un contrôleur contient la logique métier exécutée par ces routes.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus modulaire, maintenable.

const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createCourse(req, res) {
  try {
    const { title, description, instructor } = req.body;
    if (!title || !description || !instructor) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const newCourse = {
      title,
      description,
      instructor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await mongoService.insertOne("courses", newCourse);
    await redisService.set(
      `course:${result.insertedId}`,
      JSON.stringify(newCourse)
    );

    res
      .status(201)
      .json({ message: "Cours créé avec succès.", course: newCourse });
  } catch (error) {
    console.error("Erreur lors de la création du cours:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
};
