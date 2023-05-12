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
  completed: Boolean,
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
/*                               GENERAL ROUTES                               */
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
/*                               GOAL ROUTES                               */
/* -------------------------------------------------------------------------- */
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
    // Create a new goal based on the goalSchema
    const newGoal = {
      title: goalData.title,
      category: goalData.category,
      description: goalData.description,
      importance: goalData.importance,
      completed: goalData.completed,
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
/*                                 Router.patch                               */
/*                       Purpose: Update content of a goal                    */
/* -------------------------------------------------------------------------- */
router.patch("/updateGoal", async (req, res) => {
  try {
    const { monthName, goalData } = req.body;

    // Find the month by its name
    const month = await Month.findOne({ name: monthName });

    // If month doesn't exist, return error
    if (!month) {
      return res.status(404).json({ message: "Month not found" });
    }

    // Find the goal by its title in the month's goals array
    const goalIndex = month.goals.findIndex(
      (goal) => goal.title === goalData.title
    );

    // If the goal is not found, return an error
    if (goalIndex === -1) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Update the goal with the provided data
    month.goals[goalIndex] = {
      ...month.goals[goalIndex],
      ...goalData,
    };

    // Save the updated month document
    await month.save();

    // Send a success response
    res.json({ message: "Goal updated successfully", month });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                  Purpose: Duplicating monthgoals into another month        */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  NOTE ROUTES                               */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                  Purpose: Add a new NOTE to a specific month               */
/* -------------------------------------------------------------------------- */
router.post("/addNote/:name", async (req, res) => {
  try {
    // Declare needed value
    // monthName to differentiate between months
    // noteData to get the data from the body, so it can be posted to the database
    const { monthName, noteData } = req.body;
    // Find the month by its title
    const month = await Month.findOne({ name: monthName /* "TestMonth" */ });
    // Set the values for the new note
    // OBS Kan dette referes til schema istedet?
    const newNote = {
      title: noteData.title,
      category: noteData.category,
      description: noteData.description,
    };
    // Pushing the newNote to the database
    month.notes.push(newNote);
    // Save the updated month to the database
    await month.save();
    // Output the data to the console
    res.json(month);
  } catch (err) {
    res.json("err");
  }
});
/* -------------------------------------------------------------------------- */
/*                                Router.patch                                */
/*                     Purpose: Edit a specific Note by ID                    */
/* -------------------------------------------------------------------------- */
router.patch("/updateNote/:monthName/:noteId", async (req, res) => {
  try {
    // Data we want to receive from the params
    const { monthName, noteId } = req.params;
    // Data we want to receive from the body
    const { title, category, description } = req.body.noteData;
    // Use the Schema to collect data from the correct DB
    const month = await Month.findOne({ name: monthName });
    // Find the note by its title in the month's notes array
    const noteIndex = month.notes.findIndex((note) => note.id === noteId);
    // If the note is not found, return an error
    if (noteIndex === -1) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    // If the title is changed, update the title
    if (title !== undefined) {
      month.notes[noteIndex].title = title;
    }
    // If the category is changed, update the category
    if (category !== undefined) {
      month.notes[noteIndex].category = category;
    }
    // If the description is changed, update the description
    if (description !== undefined) {
      month.notes[noteIndex].description = description;
    }
    // Save the updated note to the database
    await month.save();
    res.status(200).json({ message: "Note updated successfully", month });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});
/* -------------------------------------------------------------------------- */
/*                               LEARNED ROUTES                               */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                Purpose: Add a new LEARNED to a specific month              */
/* -------------------------------------------------------------------------- */
router.post("/addLearned/:name", async (req, res) => {
  try {
    const { monthName, learnedData } = req.body;
    const month = await Month.findOne({ name: monthName });
    const newLearned = {
      title: learnedData.title,
      category: learnedData.category,
      description: learnedData.description,
    };
    month.learned.push(newLearned);
    await month.save();
    res.json(month);
  } catch (err) {
    res.json("err");
  }
});
/* -------------------------------------------------------------------------- */
/*                                Router.patch                                */
/*                   Purpose: Edit a specific Learned by ID                   */
/* -------------------------------------------------------------------------- */
router.patch("/updateLearned/:monthName/:learnedId", async (req, res) => {
  try {
    const { monthName, learnedId } = req.params;
    const { title, category, description } = req.body.learnedData;
    const month = await Month.findOne({ name: monthName });
    const learnedIndex = month.learned.findIndex(
      (learned) => learned.id === learnedId
    );
    if (learnedIndex === -1) {
      res.status(404).json({ message: "Learned not found" });
      return;
    }
    if (title !== undefined) {
      month.learned[learnedIndex].title = title;
    }
    if (category !== undefined) {
      month.learned[learnedIndex].category = category;
    }
    if (description !== undefined) {
      month.learned[learnedIndex].description = description;
    }
    await month.save();
    res.status(200).json({ message: "Learned updated successfully", month });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
