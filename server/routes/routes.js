//________________________________________ SetUp
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const cors = require("cors");
const User = require("../models/User");
const { response } = require("express");

router.use(express.json());
router.use(cors());

//________________________________________ Users

// Create if not exist
router.post("/user", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const type = req.body.type;
  const mail = req.body.mail ? req.body.mail : null;
  const diet = req.body.diet ? req.body.diet : null;
  const avatar = req.body.avatar ? req.body.avatar : null;
  const recipes = req.body.recipes ? req.body.recipes : 0;
  const popotes = req.body.popotes ? req.body.popotes : 0;
  const comments = req.body.comments ? req.body.comments : 0;
  const notes = req.body.notes ? req.body.notes : 0;
  const linkedin = req.body.linkedin ? req.body.linkedin : null;
  const snapchat = req.body.snapchat ? req.body.snapchat : null;
  const facebook = req.body.facebook ? req.body.facebook : null;
  const instagram = req.body.instagram ? req.body.instagram : null;
  const isAdmin = req.body.isAdmin ? req.body.isAdmin : false;

  db.User.findOne({
    where: {
      name,
    },
  }).then((response) => {
    if (response) return res.send("User already exist");
    else
      db.User.create({
        name,
        password,
        type,
        mail,
        diet,
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
      }).then((createdUser) => res.json(createdUser));
  });
});

// Check existing account
router.post("/user/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  db.User.findOne({
    where: {
      name: name,
      password: password,
    },
  }).then((userValidated) => {
    if (!userValidated) res.send("Wrong credentials");
    else {
      //const accessToken = createAccessToken({ userValidated });
      res.send({
        //accessToken: accessToken,
      });
    }
  });
});

// Retrieve all
router.get("/users", (req, res) => {
  db.User.findAll().then((users) => res.json(users));
});

// Retrieve one
router.get("/:user", (req, res) => {
  db.User.findOne({
    where: {
      name: req.params.user,
    },
  }).then((user) => res.json(user));
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
