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
/*            Connection to MongoDB Database and collection "months"           */
/* -------------------------------------------------------------------------- */
async function testCollection() {
  // Get the connection string from the .env file
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });
  // Return the collection "goals"
  return client.db("monthplanner").collection("months");
}

/* -------------------------------------------------------------------------- */
/*                  Routes for the API calls to the database                  */
/* -------------------------------------------------------------------------- */
// Get months (for testing purposes)
router.get("/", async (req, res) => {
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

// POST a new month with subcollections
router.post("/addMonth", async (req, res) => {
  const monthName = req.body.name;
  const newMonth = {
    name: monthName,
    goals: [],
    learned: [],
    made: [],
    notes: [],
  };

  try {
    //get data
    const monthsCollection = await testCollection();
    //insert data
    await monthsCollection.insertOne(newMonth);
    //resopnse
    res.status(201).send({ message: "New month added successfully" });
  } catch (err) {
    console.log("Error adding new month:", err);
    res.status(500).send(err);
  }
});

// POST a new goal to a month
router.post("/:monthName/goals", async (req, res) => {
  const monthName = req.params.monthName;
  const { name, category, description, importance } = req.body;

  const monthsCollection = await testCollection();
  const monthRef = await monthsCollection.findOne({ name: monthName });

  if (monthRef) {
    const goal = {
      name,
      category,
      description,
      importance,
    };

    await monthsCollection.updateOne(
      { _id: monthRef._id },
      { $push: { goals: goal } }
    );

    res.status(201).send({ message: "New goal added successfully." });
  } else {
    res.status(404).send({ message: "Month not found." });
  }
});

/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
