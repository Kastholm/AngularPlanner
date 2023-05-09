/* -------------------------------------------------------------------------- */
/*          Loading all the modules and dependencies for the database         */
/* -------------------------------------------------------------------------- */
// Loading dotenv to access environment variables
require("dotenv").config();
// Loading express for handling API routes
const express = require("express");
// Loading mongoose to interact with MongoDB database
const mongoose = require("mongoose");
// Loading router to define and handle routes
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                         Defining the Month schema                          */
/* -------------------------------------------------------------------------- */
const monthSchema = new mongoose.Schema({
  name: String,
  goals: [String],
  learned: [String],
  made: [String],
  notes: [String],
});

const Month = mongoose.model("Month", monthSchema);

/* -------------------------------------------------------------------------- */
/*            Connection to MongoDB Database and collection "months"          */
/* -------------------------------------------------------------------------- */
async function testConnection() {
  // Get the connection string from the .env file and append the database name
  const connectionString = `${process.env.MONGODB_URL}`;
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
testConnection();

/* -------------------------------------------------------------------------- */
/*                  Routes for the API calls to the database                  */
/* -------------------------------------------------------------------------- */
// Get months (for testing purposes)
router.get("/", async (req, res) => {
  try {
    const data = await Month.find({});
    console.log("Sending data:", data);
    res.send(data);
  } catch (err) {
    console.log("Error fetching data:", err);
    res.status(500).send(err);
  }
});

// POST a new month with subcollections
router.post("/addMonth", async (req, res) => {
  const monthName = req.body.name;
  const newMonth = new Month({
    name: monthName,
    goals: [],
    learned: [],
    made: [],
    notes: [],
  });

  try {
    await newMonth.save();
    res.status(201).send({ message: "New month added successfully" });
  } catch (err) {
    console.log("Error adding new month:", err);
    res.status(500).send(err);
  }
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
