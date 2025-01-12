// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour bien organiser le code.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Grouper les routes similaires dans les memes fichiers .

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes pour les cours
router.post("/", courseController.createCourse);
router.get("/:id", courseController.getCourse);
router.get("/stats", courseController.getCourseStats);

module.exports = router;
