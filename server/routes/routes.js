//________________________________________ SetUp
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const cors = require("cors");
const User = require("../models/User");
const { response } = require("express");
const multer = require("multer");
const path = require("path");
const { unlink } = require("fs");
const { stringify } = require("querystring");

router.use(express.json());
router.use(cors());

const customizedError = (error, from) => {
  return {
    From: from,
    Error: error.name,
    Code: error.parent && error.parent.code,
    Message: error.parent && error.parent.sqlMessage,
    Query: error.sql,
    Parameters: error.parameters,
    FullError: error.parent ? "" : error,
  };
};

//________________________________________ Image storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/Images"); //or server/Images
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(".")[0] +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" }, //1mb
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) return cb(null, true);
    cb("Wrong image format.");
  },
});

//________________________________________ Users

// Register (if not exist)
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

// Login
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
        userValidated,
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
router.get("/users/:user", (req, res) => {
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
  const image = "no image yet";
  const tags = req.body.tags;
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
    tags,
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
  })
    .then((createdRecipe) => {
      if (createdRecipe) return res.json(createdRecipe);
      return res.send("Could not create recipe.");
    })
    .catch((err) => {
      console.log(customizedError(err, "POST create Recipe"));
      res.json({ error: err.name });
    });
});

// Update
router.put("/recipes/:recipeID", (req, res) => {
  const payload = req.body.payload;
  db.Recipe.update(payload, {
    where: {
      id: req.params.recipeID,
    },
  }).catch((err) => {
    console.log(customizedError(err, "PUT update Recipe"));
    res.json({ error: err.name });
  });
});

// Update image
// /!\ Dirty /!\
// *Intermediate endpoint because of content-types conflict in Axios request (application/json vs multipart/data-form)*
router.put("/:recipeID/recipeImage", upload.single("image"), (req, res) => {
  const image = req.file.path;
  db.Recipe.update(
    {
      image,
    },
    {
      where: {
        id: req.params.recipeID,
      },
    }
  ).catch((err) => {
    console.log(customizedError(err, "PUT update Recipe Image"));
    res.json({ error: err.name });
  });
});

// Delete
router.delete("/recipes/:recipeID", (req, res) => {
  db.Recipe.destroy({
    where: {
      id: req.params.recipeID,
    },
  })
    .then((deletedRecipe) => {
      if (deletedRecipe) {
        // Delete associated recipe image
        unlink(`../client/src/Images/${req.query.image}`, (error) => {
          if (error) console.log(error);
        });
        return res.json(deletedRecipe);
      }
      return res.send("Could not delete recipe.");
    })
    .catch((err) => {
      console.log(customizedError(err, "DELETE Recipe"));
      res.json({ error: err.name });
    });
});

// Retrieve all
router.get("/recipes", (req, res) => {
  db.Recipe.findAll()
    .then((recipes) => res.json(recipes))
    .catch((err) => {
      console.log(customizedError(err, "GET all Recipes"));
      res.json({ error: err.name });
    });
});

// Retrieve all from userID
router.get("/userrecipes/:userID", (req, res) => {
  db.Recipe.findAll({
    where: {
      user_id: req.params.userID,
    },
  })
    .then((userrecipes) => res.json(userrecipes))
    .catch((err) => {
      console.log(customizedError(err, "GET all user's Recipes"));
      res.json({ error: err.name });
    });
});

// Retrieve one
router.get("/recipes/:recipeID", (req, res) => {
  db.Recipe.findOne({
    where: {
      id: req.params.recipeID,
    },
  })
    .then((recipe) => res.json(recipe))
    .catch((err) => {
      console.log(customizedError(err, "GET one Recipe by ID"));
      res.json({ error: err.name });
    });
});

//________________________________________ Favorite Recipes

// Create
router.post("/favorites", (req, res) => {
  const recipe_id = req.body.recipe_id;
  const user_id = req.body.user_id;

  db.FavoriteRecipe.create({
    recipe_id,
    user_id,
  })
    .then((createdFav) => res.json(createdFav))
    .catch((err) => {
      console.log(customizedError(err, "POST create Favorite Recipe"));
      res.json({ error: err.name });
    });
});

// Delete
router.delete("/favorites/:recipeID", (req, res) => {
  db.FavoriteRecipe.destroy({
    where: {
      recipe_id: req.params.recipeID,
      user_id: req.query.userId,
    },
  })
    .then((deletedFav) => {
      if (deletedFav) {
        return res.json(deletedFav);
      }
      return res.send("Could not delete favorite.");
    })
    .catch((err) => {
      console.log(customizedError(err, "DELETE Favorite Recipe"));
      res.json({ error: err.name });
    });
});

// Retrieve one
router.get("/favorites/:recipeID", (req, res) => {
  db.FavoriteRecipe.findOne({
    where: {
      recipe_id: req.params.recipeID,
      user_id: req.query.userId,
    },
  })
    .then((favorite) => res.json(favorite))
    .catch((err) => {
      console.log(customizedError(err, "GET one user's Favorite Recipe"));
      res.json({ error: err.name });
    });
});

// Retrieve all by userID
router.get("/userfavorites/:userID", (req, res) => {
  db.FavoriteRecipe.findAll({
    where: {
      user_id: req.params.userID,
    },
  })
    .then((usersFavs) => {
      let usersFavArray = [];

      usersFavs.map((usersFav) => {
        usersFavArray.push(usersFav.recipe_id);
      });

      res.json(usersFavArray);
    })
    .catch((err) => {
      console.log(customizedError(err, "GET all User's Favorites Recipes"));
      res.json({ error: err.name });
    });
});

//________________________________________ Ingredients

// Create
router.post("/ingredients/:recipeId", (req, res) => {
  const ingredientsArrayInput = req.body.ingredients;

  const ingredientsArrayOutput = ingredientsArrayInput.map((ingredient) => {
    return {
      name: ingredient.name,
      quantity: ingredient.quantity,
      unity: ingredient.unity,
      recipe_id: req.params.recipeId,
    };
  });

  db.Ingredient.bulkCreate(ingredientsArrayOutput)
    .then((createdIngredient) => {
      if (createdIngredient) return res.json(createdIngredient);
      return res.send("Could not create ingredients.");
    })
    .catch((err) => {
      console.log(customizedError(err, "POST create Ingredients"));
      res.json({ error: err.name });
    });
});

// Retrieve all
router.get("/ingredients", (req, res) => {
  db.Ingredient.findAll()
    .then((ingredients) => res.json(ingredients))
    .catch((err) => {
      console.log(customizedError(err, "GET all Ingredients"));
      res.json({ error: err.name });
    });
});

// Retrieve all by recipe
router.get("/ingredients/:recipeId", (req, res) => {
  db.Ingredient.findAll({
    where: {
      recipe_id: req.params.recipeId,
    },
  })
    .then((ingredients) => res.json(ingredients))
    .catch((err) => {
      console.log(customizedError(err, "GET all Ingredients from a Recipe"));
      res.json({ error: err.name });
    });
});

//________________________________________ Comments

// Create
router.post("/comments", (req, res) => {
  const content = req.body.content;
  const note = req.body.note | null;
  const thread_id = req.body.thread_id;
  const likes = req.body.likes;
  const dislikes = req.body.dislikes;
  const recipe_id = req.query.recipe_id;
  const user_id = req.body.user_id;
  const author = req.body.author;

  db.Comment.create({
    user_id,
    author,
    note,
    content,
    thread_id,
    likes,
    dislikes,
    recipe_id,
  })
    .then((createdComment) => {
      if (createdComment) res.sendStatus(201);
    })
    .catch((err) => {
      console.log(customizedError(err, "POST create Comment"));
      res.json({ error: err.name });
    });
});

// Retrieve all by recipe
router.get("/comments/:recipeId", (req, res) => {
  db.Comment.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      recipe_id: req.params.recipeId,
    },
  })
    .then((comments) => res.json(comments))
    .catch((err) => {
      console.log(customizedError(err, "GET all Comments from Recipe"));
      res.json({ error: err.name });
    });
});

//________________________________________ Steps

// Create
router.post("/steps/:recipeId", (req, res) => {
  const stepsArrayInput = req.body.stepsFormatedForAPI;

  const stepsArrayOutput = stepsArrayInput.map((step) => {
    return {
      content: step.content,
      nbStep: step.nbStep,
      recipe_id: req.params.recipeId,
    };
  });

  db.Step.bulkCreate(stepsArrayOutput)
    .then((createdStep) => {
      if (createdStep) return res.json(createdStep);
      return res.send("Could not create steps.");
    })
    .catch((err) => {
      console.log(customizedError(err, "POST create Steps"));
      res.json({ error: err.name });
    });
});

// Retrieve all
router.get("/steps", (req, res) => {
  db.Step.findAll()
    .then((steps) => res.json(steps))
    .catch((err) => {
      console.log(customizedError(err, "GET all Steps"));
      res.json({ error: err.name });
    });
});

// Retrieve all by recipe
router.get("/steps/:recipeId", (req, res) => {
  db.Step.findAll({
    where: {
      recipe_id: req.params.recipeId,
    },
  })
    .then((steps) => res.json(steps))
    .catch((err) => {
      console.log(customizedError(err, "GET all Steps from Recipe"));
      res.json({ error: err.name });
    });
});

//________________________________________ Notes

// Create
router.post("/notes", (req, res) => {
  const value = req.body.value;
  const recipe_id = req.body.recipe_id;
  const user_id = req.body.user_id;

  db.Note.findOne({
    where: { user_id, recipe_id },
  })
    .then((createdNote) => {
      res.sendStatus(200);
      if (createdNote)
        return db.Note.update(
          {
            value,
          },
          {
            where: {
              user_id,
            },
          }
        );
      return db.Note.create({
        value,
        recipe_id,
        user_id,
      });
    })
    .catch((err) => {
      console.log(customizedError(err, "POST create Note"));
      res.json({ error: err.name });
    });
});

// Retrieve all by recipe and send actual user's note
router.get("/notes/:recipeID", (req, res) => {
  const user_id = parseInt(req.query.userId);

  db.Note.findAll({
    where: {
      recipe_id: req.params.recipeID,
    },
  })
    .then((notes) => {
      let noteArray = [];
      let usersNote;

      notes.map((note) => {
        noteArray.push({ user_id: note.user_id, note: note.value });
        if (user_id && note.user_id === user_id) usersNote = note.value;
      });

      res.json({ noteArray, usersNote });
    })
    .catch((err) => {
      console.log(customizedError(err, "GET all Notes"));
      res.json({ error: err.name });
    });
});

// Retrieve one
router.get("/notes/users/:userID", (req, res) => {
  const user_id = req.params.userID;

  db.Note.findOne({
    where: { user_id },
  })
    .then((foundNote) => res.json(foundNote?.value))
    .catch((err) => {
      console.log(customizedError(err, "GET one Note"));
      res.json({ error: err.name });
    });
});


//________________________________________ Not implemented yet:

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
