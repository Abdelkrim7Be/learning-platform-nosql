const mongoService = require("../services/mongoService");

const studentController = {
  async createStudent(req, res) {
    try {
      console.log("createStudent called with data:", req.body);
      const student = await mongoService.insertStudent(req.body);
      console.log("Student created:", student);
      res.status(201).json(student);
    } catch (error) {
      console.error("Failed to create student:", error);
      res.status(500).json({ error: "Failed to create student" });
    }
  },

  async getAllStudents(req, res) {
    try {
      console.log("getAllStudents called");
      const students = await mongoService.getAllStudents();
      console.log("Students retrieved:", students);
      res.status(200).json(students);
    } catch (error) {
      console.error("Failed to get students:", error);
      res.status(500).json({ error: "Failed to get students" });
    }
  },

  async getStudentById(req, res) {
    try {
      console.log("getStudentById called with ID:", req.params.id);
      const student = await mongoService.getStudentById(req.params.id);
      if (!student) {
        console.log("Student not found with ID:", req.params.id);
        return res.status(404).json({ error: "Student not found" });
      }
      console.log("Student retrieved:", student);
      res.status(200).json(student);
    } catch (error) {
      console.error("Failed to get student:", error);
      res.status(500).json({ error: "Failed to get student" });
    }
  },

  async updateStudent(req, res) {
    try {
      console.log(
        "updateStudent called with ID:",
        req.params.id,
        "and data:",
        req.body
      );
      const student = await mongoService.updateStudentById(
        req.params.id,
        req.body
      );
      if (!student) {
        console.log("Student not found with ID:", req.params.id);
        return res.status(404).json({ error: "Student not found" });
      }
      console.log("Student updated:", student);
      res.status(200).json(student);
    } catch (error) {
      console.error("Failed to update student:", error);
      res.status(500).json({ error: "Failed to update student" });
    }
  },

  async deleteStudent(req, res) {
    try {
      console.log("deleteStudent called with ID:", req.params.id);
      const student = await mongoService.deleteStudentById(req.params.id);
      if (!student) {
        console.log("Student not found with ID:", req.params.id);
        return res.status(404).json({ error: "Student not found" });
      }
      console.log("Student deleted with ID:", req.params.id);
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Failed to delete student:", error);
      res.status(500).json({ error: "Failed to delete student" });
    }
  },

  async enrollInCourse(req, res) {
    try {
      console.log(
        "enrollInCourse called with student ID:",
        req.params.studentId,
        "and course ID:",
        req.params.courseId
      );
      const enrollment = await mongoService.enrollStudentInCourse(
        req.params.studentId,
        req.params.courseId
      );
      console.log("Student enrolled in course:", enrollment);
      res.status(200).json(enrollment);
    } catch (error) {
      console.error("Failed to enroll in course:", error);
      res.status(500).json({ error: "Failed to enroll in course" });
    }
  },

  async getEnrolledCourses(req, res) {
    try {
      console.log(
        "getEnrolledCourses called with student ID:",
        req.params.studentId
      );
      const courses = await mongoService.getEnrolledCourses(
        req.params.studentId
      );
      console.log("Enrolled courses retrieved:", courses);
      res.status(200).json(courses);
    } catch (error) {
      console.error("Failed to get enrolled courses:", error);
      res.status(500).json({ error: "Failed to get enrolled courses" });
    }
  },
};

module.exports = studentController;
