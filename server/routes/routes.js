//________________________________________ SetUp
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const cors = require("cors");

router.use(express.json());
router.use(cors());

//________________________________________ Users

// Create if not exist
router.post("/user", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const mail = req.body.mail;
  const diet = req.body.diet;
  const type = req.body.type;
  const avatar = req.body.avatar;
  const recipes = req.body.recipes;
  const popotes = req.body.popotes;
  const comments = req.body.comments;
  const notes = req.body.notes;
  const linkedin = req.body.linkedin;
  const snapchat = req.body.snapchat;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;
  const isAdmin = req.body.isAdmin;

  db.User.findOrCreate({
    where: {
      name,
      password,
      mail,
      diet,
      type,
      avatar,
      recipes,
      popotes,
      comments,
      notes,
      linkedin,
      snapchat,
      facebook,
      instagram,
      isAdmin,
    },
  }).then((creationStatus) => {
    if (creationStatus[1]) res.json(creationStatus[0]);
    else res.send(creationStatus[1]);
  });
});

//________________________________________ Recipes
//________________________________________ Ingredients
//________________________________________ Steps
//________________________________________ Tags
//________________________________________ Comments
//________________________________________ Notes
//________________________________________ Likes
//________________________________________ Notifications
module.exports = router;
