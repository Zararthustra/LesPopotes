//________________________________________ SetUp
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const cors = require("cors");
const User = require("../models/User");

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

// Create
router.post("/recipe", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const nbPers = req.body.nbPers;
  const isNbVariable = req.body.isNbVariable;
  const type = req.body.type;
  const author = req.body.author;
  const user_id = req.body.user_id;
  const bakeTime = req.body.bakeTime;
  const prepTime = req.body.prepTime;
  const bakeType = req.body.bakeType;
  const difficulty = req.body.difficulty;
  const comments = req.body.comments;
  const notes = req.body.notes;
  const signal = req.body.signal;
  const authorComment = req.body.authorComment;

  db.Recipe.create({
    name,
    image,
    nbPers,
    isNbVariable,
    type,
    author,
    user_id,
    bakeTime,
    prepTime,
    bakeType,
    difficulty,
    comments,
    notes,
    signal,
    authorComment,
  }).then((createdRecipe) => res.json(createdRecipe));
});

//________________________________________ Favorite Recipes

// Create
router.post("/recipe/favorite", (req, res) => {
  const recipe_id = req.body.recipe_id;
  const user_id = req.body.user_id;

  db.FavoriteRecipe.create({
    recipe_id,
    user_id,
  }).then((createdFav) => res.json(createdFav));
});

//________________________________________ Notifications

// Create
router.post("/notification", (req, res) => {
  const isChecked = req.body.isChecked;
  const recipe_id = req.body.recipe_id;
  const comment_id = req.body.comment_id;
  const user_id = req.body.user_id;

  db.Notification.create({
    isChecked,
    recipe_id,
    comment_id,
    user_id,
  }).then((createdNotif) => res.json(createdNotif));
});

//________________________________________ User Notifications

// Create
router.post("/user/notification", (req, res) => {
  const notification_id = req.body.notification_id;
  const user_id = req.body.user_id;

  db.UserNotification.create({
    notification_id,
    user_id,
  }).then((createdUserNotif) => res.json(createdUserNotif));
});

//________________________________________ Ingredients

// Create
router.post("/ingredient", (req, res) => {
  const name = req.body.name;
  const quantity = req.body.quantity;
  const unity = req.body.unity;
  const recipe_id = req.body.recipe_id;

  db.Ingredient.create({
    name,
    recipe_id,
    quantity,
    unity,
  }).then((createdIngredient) => res.json(createdIngredient));
});

//________________________________________ Recipe Ingredients

// Create
router.post("/recipe/ingredient", (req, res) => {
  const ingredient_id = req.body.ingredient_id;
  const recipe_id = req.body.recipe_id;

  db.RecipeIngredient.create({
    ingredient_id,
    recipe_id,
  }).then((createdRecipeIngredient) => res.json(createdRecipeIngredient));
});

//________________________________________ Comments

// Create
router.post("/recipe/comment", (req, res) => {
  const content = req.body.content;
  const thread_id = req.body.thread_id;
  const likes = req.body.likes;
  const dislikes = req.body.dislikes;
  const recipe_id = req.body.recipe_id;
  const user_id = req.body.user_id;

  db.Comment.create({
    user_id,
    content,
    thread_id,
    likes,
    dislikes,
    recipe_id,
  }).then((createdComment) => res.json(createdComment));
});

//________________________________________ Steps

// Create
router.post("/recipe/step", (req, res) => {
  const content = req.body.content;
  const nbStep = req.body.nbStep;
  const recipe_id = req.body.recipe_id;

  db.Step.create({
    content,
    nbStep,
    recipe_id,
  }).then((createdStep) => res.json(createdStep));
});

//________________________________________ Tags

// Create
router.post("/tag", (req, res) => {
  const name = req.body.name;

  db.Tag.create({
    name,
  }).then((createdTag) => res.json(createdTag));
});

//________________________________________ Recipe Tags

// Create
router.post("/recipe/tag", (req, res) => {
  const tag_id = req.body.tag_id;
  const recipe_id = req.body.recipe_id;

  db.RecipeTag.create({
    tag_id,
    recipe_id,
  }).then((createdRecipeTag) => res.json(createdRecipeTag));
});

//________________________________________ Notes

// Create
router.post("/note", (req, res) => {
  const value = req.body.value;
  const recipe_id = req.body.recipe_id;
  const user_id = req.body.user_id;

  db.Note.create({
    value,
    recipe_id,
    user_id,
  }).then((createdNote) => res.json(createdNote));
});

//________________________________________ Likes

// Create
router.post("/like", (req, res) => {
  const isLiked = req.body.isLiked;
  const comment_id = req.body.comment_id;
  const user_id = req.body.user_id;

  db.Like.create({
    isLiked,
    comment_id,
    user_id,
  }).then((createdLike) => res.json(createdLike));
});

module.exports = router;
