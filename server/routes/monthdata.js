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

// Define a common schema for tasks
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: { type: Boolean, default: false },
});

const weekSchema = new Schema({
  _id: false,
  Monday: {
    type: [taskSchema],
    default: [],
  },
  Tuesday: {
    type: [taskSchema],
    default: [],
  },
  Wednesday: {
    type: [taskSchema],
    default: [],
  },
  Thursday: {
    type: [taskSchema],
    default: [],
  },
  Friday: {
    type: [taskSchema],
    default: [],
  },
  Saturday: {
    type: [taskSchema],
    default: [],
  },
  Sunday: {
    type: [taskSchema],
    default: [],
  },
});

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
  weeks: {
    type: [weekSchema],
    default: [{}], // Create four empty weeks by default
  },
  learned: [childSchema],
  notes: [childSchema],
});

// Create the Month model based on the monthSchema
const Month = mongoose.model("Month", monthSchema);

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
/*                                Router.patch                                */
/*                   Purpose: Edit a specific Goal by ID                   */
/* -------------------------------------------------------------------------- */
router.patch("/updateGoal/:monthName/:goalId", async (req, res) => {
  try {
    const { monthName, goalId } = req.params;
    const { title, category, description, importance, completed } =
      req.body.goalData;
    const month = await Month.findOne({ name: monthName });
    const goalIndex = month.goals.findIndex((goal) => goal.id === goalId);
    if (goalIndex === -1) {
      res.status(404).json({ message: "Goal not found" });
      return;
    }
    if (title !== undefined) {
      month.goals[goalIndex].title = title;
    }
    if (category !== undefined) {
      month.goals[goalIndex].category = category;
    }
    if (description !== undefined) {
      month.goals[goalIndex].description = description;
    }
    if (importance !== undefined) {
      month.goals[goalIndex].importance = importance;
    }
    if (completed !== undefined) {
      month.goals[goalIndex].completed = completed;
    }
    await month.save();
    res.status(200).json({ message: "Goal updated successfully", month });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
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
/*                                 WEEK ROUTES                                */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*              Purpose: Add a new todo to a specific day in a month          */
/* -------------------------------------------------------------------------- */
router.post("/addTodo/:monthName/:dayName", async (req, res) => {
  try {
    const { monthName, dayName } = req.params;
    console.log("ServerMonth:", monthName);
    console.log("Server Day:", dayName);
    const { title, description } = req.body.todoData; // Destructure the todoData object

    console.log("Server Todo Data:", req.body.todoData);
    // Find the month based on the monthName
    const month = await Month.findOne({ name: monthName });
    console.log("Month:", month);
    console.log("Day Name:", dayName);

    // Additional logging
    console.log("Complete Month Object:", month);
    console.log("Week 0:", month.weeks[0]);

    // Find the day based on the dayName
    const day = month.weeks[0][dayName];
    console.log("Found Day:", dayName, day);

    if (day) {
      const newTodo = {
        title: title,
        description: description,
        completed: false,
      };

      day.push(newTodo);
      await month.save();

      res.json("Todo added successfully");
    } else {
      res.json("Day not found");
    }
  } catch (err) {
    // Improved error logging
    console.error("Server error: ", err);
    res.json(`Server error: ${err.message}`);
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                 Purpose: Update a todo to be completed or not              */
/* -------------------------------------------------------------------------- */
router.patch("/updateTodo/:monthName/:dayName/:todoId", async (req, res) => {
  const { monthName, dayName, todoId } = req.params;
  const { completed } = req.body; // Whether the todo is completed

  const month = await Month.findOne({ name: monthName });
  const day = month.weeks[0][dayName];

  const todo = day.find((todo) => todo._id.toString() === todoId);
  if (todo) {
    todo.completed = completed;
    await month.save();
    res.json("Todo updated successfully");
  } else {
    res.json("Todo not found");
  }
});
/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
