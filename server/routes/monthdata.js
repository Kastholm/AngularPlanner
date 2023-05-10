/* -------------------------------------------------------------------------- */
/*          Loading all the modules and dependencies for the database         */
/* -------------------------------------------------------------------------- */
// Loading dotenv to access environment variables
require("dotenv").config();
// Loading express for handling API routes
const express = require("express");
// Loading mongoose to interact with MongoDB database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Loading router to define and handle routes
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                SCHEMAS                                     */
/* -------------------------------------------------------------------------- */

const childSchema = new Schema({
  title: String,
  category: String,
  description: String,
});
// Define the childSchema
const goalSchema = new Schema({
  title: String,
  category: String,
  description: String,
  importance: Number,
});

// Define the monthSchema
const monthSchema = new Schema({
  name: String,
  goals: [goalSchema],
  learned: [childSchema],
  made: [childSchema],
  notes: [childSchema],
});

// Create the Month model based on the monthSchema
const Month = mongoose.model("Month", monthSchema);

/* -------------------------------------------------------------------------- */
/*            Connection to MongoDB Database and collection "months"          */
/* -------------------------------------------------------------------------- */
async function dbConnection() {
  // Get the connection string from the .env file and append the database name
  const connectionString = `${process.env.MONGODB_URL}/monthplanner`;
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
dbConnection();

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 Router.get                                 */
/*              Purpose: Get all the monthdata from the database              */
/* -------------------------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const showMonthData = await Month.find();
    res.json(showMonthData);
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                  Purpose: Add a new monthset to the database               */
/* -------------------------------------------------------------------------- */
router.post("/addMonth", async (req, res) => {
  try {
    const monthName = req.body.name;
    // Create a new Month instance based on the monthSchema
    const newMonth = new Month({
      name: monthName,
    });
    await newMonth.save();
    res.json(newMonth); // Respond with the added month data
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                  Purpose: Add a new goal to a specific month               */
/* -------------------------------------------------------------------------- */
router.post("/addGoal/:name", async (req, res) => {
  try {
    // req data from body
    const { monthName, goalData } = req.body;
    // Find the month by its title
    const month = await Month.findOne({ name: monthName /* 'TestMonth' */ });
    // If month doesn't exist, return error
    if (!month) {
      return res.status(404).json({ message: "Month not found" });
    }
    // Create a new goal based on the goalSchema
    const newGoal = {
      title: goalData.title,
      category: goalData.category,
      description: goalData.description,
      importance: goalData.importance,
    };
    // Pushing to the database
    month.goals.push(newGoal);
    // Save the updated month to the database
    await month.save();
    // Output the data to the console
    res.json(month);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
