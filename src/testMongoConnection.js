require("dotenv").config({ path: "./.env" }); // Update the path to .env
const { MongoClient } = require("mongodb");

async function testMongoConnection() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
  }
}

testMongoConnection();
