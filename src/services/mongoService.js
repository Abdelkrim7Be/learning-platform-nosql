const { ObjectId } = require("mongodb");
const { obtenirDb } = require("../config/db");

const getCourseCollection = () => {
  const db = obtenirDb();
  return db.collection("courses");
};

const getUserCollection = () => {
  const db = obtenirDb();
  return db.collection("users");
};

const getStudentCollection = () => {
  const db = obtenirDb();
  return db.collection("students");
};

const mongoService = {
  // Course operations
  async insertCourse(data) {
    const collection = getCourseCollection();
    const result = await collection.insertOne(data);
    return result.ops[0];
  },

  async getAllCourses() {
    const collection = getCourseCollection();
    return await collection.find({}).toArray();
  },

  async getCourseById(id) {
    const collection = getCourseCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  },

  async updateCourseById(id, data) {
    const collection = getCourseCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnOriginal: false }
    );
    return result.value;
  },

  async deleteCourseById(id) {
    const collection = getCourseCollection();
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return result.value;
  },

  // User operations
  async insertUser(data) {
    const collection = getUserCollection();
    const result = await collection.insertOne(data);
    return result.ops[0];
  },

  async getAllUsers() {
    const collection = getUserCollection();
    return await collection.find({}).toArray();
  },

  async getUserById(id) {
    const collection = getUserCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  },

  async updateUserById(id, data) {
    const collection = getUserCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnOriginal: false }
    );
    return result.value;
  },

  async deleteUserById(id) {
    const collection = getUserCollection();
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return result.value;
  },

  // Student operations
  async insertStudent(data) {
    const collection = getStudentCollection();
    const result = await collection.insertOne(data);
    return result.ops[0];
  },

  async getAllStudents() {
    const collection = getStudentCollection();
    return await collection.find({}).toArray();
  },

  async getStudentById(id) {
    const collection = getStudentCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  },

  async updateStudentById(id, data) {
    const collection = getStudentCollection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnOriginal: false }
    );
    return result.value;
  },

  async deleteStudentById(id) {
    const collection = getStudentCollection();
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return result.value;
  },

  // Enrollment operations
  async enrollStudentInCourse(studentId, courseId) {
    const studentCollection = getStudentCollection();
    const courseCollection = getCourseCollection();
    const student = await studentCollection.findOne({
      _id: new ObjectId(studentId),
    });
    const course = await courseCollection.findOne({
      _id: new ObjectId(courseId),
    });

    if (!student || !course) {
      throw new Error("Student or Course not found");
    }

    await studentCollection.updateOne(
      { _id: new ObjectId(studentId) },
      { $addToSet: { enrolledCourses: new ObjectId(courseId) } }
    );

    return { studentId, courseId };
  },

  async getEnrolledCourses(studentId) {
    const studentCollection = getStudentCollection();
    const student = await studentCollection.findOne({
      _id: new ObjectId(studentId),
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const courseCollection = getCourseCollection();
    const courses = await courseCollection
      .find({ _id: { $in: student.enrolledCourses || [] } })
      .toArray();

    return courses;
  },
};

module.exports = mongoService;
