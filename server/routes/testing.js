/* -------------------------------------------------------------------------- */
/*          Loading all the modules and dependencies for the database         */
/* -------------------------------------------------------------------------- */
// Loading dotenv to access environment variables
require("dotenv").config();
// Loading express for handling API routes
const express = require("express");
// Loading mongodb to interact with MongoDB database
const mongodb = require("mongodb");
// Loading router to define and handle routes
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*            Connection to MongoDB Database and collection "users"           */
/* -------------------------------------------------------------------------- */
async function testCollection() {
  // Get the connection string from the .env file
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });
  // Return the collection "users"
  return client.db("testDatabase").collection("testCollection");
}

/* -------------------------------------------------------------------------- */
/*                  Routes for the API calls to the database                  */
/* -------------------------------------------------------------------------- */
// Get Users (for testing purposes)
router.get("/", async (req, res) => {
  console.log("Received a request to /api");
  const testing = await testCollection();
  testing
    .find({})
    .toArray()
    .then((data) => {
      console.log("Sending data:", data);
      res.send(data);
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
      res.status(500).send(err);
    });
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
