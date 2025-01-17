const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
router.post("/:studentId/enroll/:courseId", studentController.enrollInCourse);
router.get("/:studentId/courses", studentController.getEnrolledCourses);

module.exports = router;
