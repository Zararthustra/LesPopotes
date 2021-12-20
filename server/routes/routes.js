//________________________________________ SetUp
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const cors = require("cors");

router.use(express.json());
router.use(cors());

//________________________________________ Users
//________________________________________ Recipes
//________________________________________ Ingredients
//________________________________________ Steps
//________________________________________ Tags
//________________________________________ Comments
//________________________________________ Notes
//________________________________________ Likes
//________________________________________ Notifications
module.exports = router;