// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Une route définit les URL et les méthodes HTTP, alors qu'un contrôleur contient la logique métier exécutée par ces routes.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus modulaire, maintenable.

const mongoService = require("../services/mongoService");

const courseController = {
  async createCourse(req, res) {
    try {
      console.log("createCourse called with data:", req.body);
      const course = await mongoService.insertCourse(req.body);
      console.log("Course created:", course);
      res.status(201).json(course);
    } catch (error) {
      console.error("Failed to create course:", error);
      res.status(500).json({ error: "Failed to create course" });
    }
  },

  async getAllCourses(req, res) {
    try {
      console.log("getAllCourses called");
      const courses = await mongoService.getAllCourses();
      console.log("Courses retrieved:", courses);
      res.status(200).json(courses);
    } catch (error) {
      console.error("Failed to get courses:", error);
      res.status(500).json({ error: "Failed to get courses" });
    }
  },

  async getCourseById(req, res) {
    try {
      console.log("getCourseById called with ID:", req.params.id);
      const course = await mongoService.getCourseById(req.params.id);
      if (!course) {
        console.log("Course not found with ID:", req.params.id);
        return res.status(404).json({ error: "Course not found" });
      }
      console.log("Course retrieved:", course);
      res.status(200).json(course);
    } catch (error) {
      console.error("Failed to get course:", error);
      res.status(500).json({ error: "Failed to get course" });
    }
  },

  async updateCourse(req, res) {
    try {
      console.log(
        "updateCourse called with ID:",
        req.params.id,
        "and data:",
        req.body
      );
      const course = await mongoService.updateCourseById(
        req.params.id,
        req.body
      );
      if (!course) {
        console.log("Course not found with ID:", req.params.id);
        return res.status(404).json({ error: "Course not found" });
      }
      console.log("Course updated:", course);
      res.status(200).json(course);
    } catch (error) {
      console.error("Failed to update course:", error);
      res.status(500).json({ error: "Failed to update course" });
    }
  },

  async deleteCourse(req, res) {
    try {
      console.log("deleteCourse called with ID:", req.params.id);
      const course = await mongoService.deleteCourseById(req.params.id);
      if (!course) {
        console.log("Course not found with ID:", req.params.id);
        return res.status(404).json({ error: "Course not found" });
      }
      console.log("Course deleted with ID:", req.params.id);
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Failed to delete course:", error);
      res.status(500).json({ error: "Failed to delete course" });
    }
  },
};

module.exports = courseController;
