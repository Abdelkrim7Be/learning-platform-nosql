// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour bien organiser le code.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Grouper les routes similaires dans les memes fichiers .

const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
