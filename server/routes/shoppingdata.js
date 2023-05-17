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
router.get("/", async (req, res) => {
  try {
    const showShoppingData = await Item.find();
    res.json(showShoppingData);
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                  Purpose: Add a new shopitem to the database               */
/* -------------------------------------------------------------------------- */
router.post("/addItem", async (req, res) => {
  try {
    const itemName = req.body.name;
    const itemDesc = req.body.description;
    // Create a new Month instance based on the monthSchema
    const newItem = new Item({
      name: itemName,
      description: itemDesc,
    });
    await newItem.save();
    res.json(newItem); // Respond with the added month data
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                                 Router.post                                */
/*                 Purpose: Delete a shopitem from the database               */
/* -------------------------------------------------------------------------- */
router.delete("/deleteItem/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await Item.findByIdAndDelete(itemId);
  } catch (err) {
    res.json({ message: err });
  }
});
/* -------------------------------------------------------------------------- */
/*                              Export the router                             */
/* -------------------------------------------------------------------------- */
module.exports = router;
