require("dotenv").config({ path: "./src/.env" }); // Update the path to .env
const express = require("express");
const { connecterMongo } = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);

async function startServer() {
  try {
    await connecterMongo();
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
