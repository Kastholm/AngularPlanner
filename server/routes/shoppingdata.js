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

const itemSchema = new Schema({
  name: String,
  imgSrc: String,
  description: String,
  price: Number,
  link: String,
});

const Item = mongoose.model("Item", itemSchema);
/* -------------------------------------------------------------------------- */
/*                               GENERAL ROUTES                               */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*                                 Router.get                                 */
/*           Purpose: Get all the shoppingdata from the database              */
/* -------------------------------------------------------------------------- */
router.get("/", async (res, req) => {
  try {
    const showShoppingData = await Item.find();
    re.json(showShoppingData);
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
