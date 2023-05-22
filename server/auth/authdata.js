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
// Loading bcrypt to hash passwords
const bcrypt = require("bcrypt");
// Loading router to define and handle routes
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                SCHEMAS                                     */
/* -------------------------------------------------------------------------- */
const userSchema = new Schema({
  email: String,
  password: String,
});

const User = mongoose.model("Users", userSchema);
/* -------------------------------------------------------------------------- */
/*                               GENERAL ROUTES                               */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 Router.get                                 */
/*           Purpose: Get all the shoppingdata from the database              */
/* -------------------------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const showUserData = await User.find();
    res.json(showUserData);
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                     Purpose: Make a login post request                     */
/* -------------------------------------------------------------------------- */
router.post("/login", async (req, res) => {
  try {
    // Find the user in the database by email
    const userData = await User.findOne({ email: req.body.email });
    // if user found
    if (userData) {
      // Compare provided password with stored hashed password
      const passwordMatches = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (passwordMatches) {
        console.log("Password matches from the server");
        return;
      }
      console.log("Password does not match from the server");
    }
    console.log("User not found");
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                Purpose: Add a new account to the database                  */
/* -------------------------------------------------------------------------- */
router.post("/createUser", async (req, res) => {
  try {
    const userData = req.body;
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = new User({
      email: userData.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
