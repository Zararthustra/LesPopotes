//________________________________________ SetUp
const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op } = require("sequelize");
const cors = require("cors");
const axios = require("axios");
//const { unlink } = require("fs");
//const multer = require("multer");
//const path = require("path");

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

//________________________________________ Users

// Register (if not exist)
router.post("/user", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const type = req.body.type;
  const mail = req.body.mail || "";
  const diet = req.body.diet || "";
  const avatar = req.body.avatar || "";
  const recipes = req.body.recipes || 0;
  const popotes = req.body.popotes || 0;
  const comments = req.body.comments || 0;
  const notes = req.body.notes || 0;
  const linkedin = req.body.linkedin || "";
  const snapchat = req.body.snapchat || "";
  const facebook = req.body.facebook || "";
  const instagram = req.body.instagram || "";
  const twitter = req.body.twitter || "";
  const tiktok = req.body.tiktok || "";
  const whatsapp = req.body.whatsapp || "";
  const isAdmin = req.body.isAdmin || false;

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
        twitter,
        tiktok,
        whatsapp,
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

// Update
router.put("/users/:userID", (req, res) => {
  const payload = req.body;
  db.User.update(payload, {
    where: {
      id: req.params.userID,
    },
  })
    .then((resp) => {
      if (resp[0] !== 1) console.log("Update recipe: \n", resp);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(customizedError(err, "PUT update User"));
      res.json({ error: err.name });
    });
});

// Increment user's field (recipes, comments, notes, popotes)
router.put("/users/:userID/:field", (req, res) => {
  db.User.increment(req.params.field, {
    by: 1,
    where: { id: req.params.userID },
  })
    .then((resp) => res.json(resp))
    .catch((err) => {
      console.log(customizedError(err, "PUT increment User's field"));
      res.json({ error: err.name });
    });
});

// Decrement user's field (recipes, comments, notes, popotes)
router.put("/users/:userID/decrement/:field", (req, res) => {
  db.User.decrement(req.params.field, {
    by: 1,
    where: { id: req.params.userID },
  })
    .then((resp) => res.json(resp))
    .catch((err) => {
      console.log(customizedError(err, "PUT decrement User's field"));
      res.json({ error: err.name });
    });
});

// Retrieve all
router.get("/users", (req, res) => {
  db.User.findAll().then((users) => res.json(users));
});

// Retrieve one
router.get("/users/:username", (req, res) => {
  db.User.findOne({
    where: {
      name: req.params.username,
    },
  }).then((user) => res.json(user));
});

// Retrieve all with pagination
router.get("/users/pagination/:offset", (req, res) => {
  const offset = parseInt(req.params.offset);
  const limit = parseInt(req.query.limit);

  db.User.findAndCountAll({
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(customizedError(err, "GET Users pagination"));
      res.json({ error: err.name });
    });
});

//________________________________________ Recipes

// Create
router.post("/recipe", (req, res) => {
  const name = req.body.name;
  const image = "";
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
  const notes = 0;
  const average = 0;
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
    average,
    signal,
    authorComment,
  })
    .then((createdRecipe) => {
      if (createdRecipe) {
        //Increment user's recipes
        axios
          .put(
            `http://localhost:3001/api/users/${createdRecipe.user_id}/recipes`
          )
          .then((resp) => {
            if (resp.status !== 200) console.log("Increment recipes: \n", resp);
          })
          .catch((err) => console.log(err));
        return res.json(createdRecipe);
      }
      return res.send("Could not create recipe.");
    })
    .catch((err) => {
      console.log(customizedError(err, "POST create Recipe"));
      res.json({ error: err.name });
    });
});

// Update
router.put("/recipes/:recipeID", (req, res) => {
  const payload = req.body;
  db.Recipe.update(payload, {
    where: {
      id: req.params.recipeID,
    },
  })
    .then((resp) => {
      if (resp[0] !== 1) console.log("Update recipe: \n", resp);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(customizedError(err, "PUT update Recipe"));
      res.json({ error: err.name });
    });
});

// Update recipe's fields (average, notes)
router.put("/recipes/average/:recipeID", (req, res) => {
  const notes = req.body.notes;
  const newNote = req.body.value;
  const average = req.body.average + (newNote - req.body.average) / (notes + 1);

  // Update average
  db.Recipe.update(
    {
      average,
    },
    {
      where: {
        id: req.params.recipeID,
      },
    }
  )
    .then((averageUpdated) => {
      // Increment notes
      db.Recipe.increment("notes", {
        by: 1,
        where: { id: req.params.recipeID },
      })
        .then((resp) => res.json(resp))
        .catch((err) => {
          console.log(customizedError(err, "PUT increment Recipe's notes"));
          res.json({ error: err.name });
        });
    })
    .catch((err) => {
      console.log(customizedError(err, "PUT update Recipe's average"));
      res.json({ error: err.name });
    });
});

// Increment recipe's comments
router.put("/recipes/:recipeID/inccomments", (req, res) => {
  db.Recipe.increment("comments", {
    by: 1,
    where: { id: req.params.recipeID },
  })
    .then((resp) => res.json(resp))
    .catch((err) => {
      console.log(customizedError(err, "PUT increment Recipe's comments"));
      res.json({ error: err.name });
    });
});

// Decrement recipe's comments
router.put("/recipes/:recipeID/deccomments", (req, res) => {
  db.Recipe.decrement("comments", {
    by: 1,
    where: { id: req.params.recipeID },
  })
    .then((resp) => res.json(resp))
    .catch((err) => {
      console.log(customizedError(err, "PUT decrement Recipe's comments"));
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
        console.log(deletedRecipe);
        //Decrement user's recipes
        axios
          .put(
            `http://localhost:3001/api/users/${req.query.user_id}/decrement/recipes`
          )
          .then((resp) => {
            if (resp.status !== 200) console.log("Decrement recipes: \n", resp);
          })
          .catch((err) => console.log(err));
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
    order: [["createdAt", "DESC"]],
  })
    .then((userrecipes) => res.json(userrecipes))
    .catch((err) => {
      console.log(customizedError(err, "GET all user's Recipes"));
      res.json({ error: err.name });
    });
});

// Retrieve all with pagination
router.get("/recipes/pagination/:offset", (req, res) => {
  const offset = parseInt(req.params.offset);
  const limit = parseInt(req.query.limit) || 10;
  const orderByName = req.query.orderByName || false;

  db.Recipe.findAndCountAll({
    offset,
    limit,
    order: [
      orderByName ? ["name", "ASC"] : ["createdAt", "DESC"]
    ],
  })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(customizedError(err, "GET Recipes pagination"));
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

// Update
router.put("/ingredients/:recipeID", (req, res) => {
  const payload = req.body;

  db.Ingredient.destroy({
    where: {
      recipe_id: req.params.recipeID,
    },
  }).catch((err) => {
    console.log(customizedError(err, "DELETE destroy ingredients"));
    res.json({ error: err.name });
  });

  db.Ingredient.bulkCreate(payload)
    .then((resp) => {
      if (resp) res.send(resp);
    })
    .catch((err) => {
      console.log(customizedError(err, "PUT update ingredients"));
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
      if (createdComment) {
        //Increment user's comments
        axios
          .put(
            `http://localhost:3001/api/users/${createdComment.user_id}/comments`
          )
          .then((resp) => {
            if (resp.status !== 200)
              console.log("Increment user's comments: \n", resp);
          })
          .catch((err) => console.log(err));
        //Increment recipe's comments
        axios
          .put(`http://localhost:3001/api/recipes/${recipe_id}/inccomments`)
          .then((resp) => {
            if (resp.status !== 200)
              console.log("Increment recipe's comments: \n", resp);
          })
          .catch((err) => console.log(err));
        res.send(createdComment);
      }
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

// Update
router.put("/steps/:recipeID", (req, res) => {
  const payload = req.body;
  db.Step.destroy({
    where: {
      recipe_id: req.params.recipeID,
    },
  }).catch((err) => {
    console.log(customizedError(err, "DELETE destroy steps"));
    res.json({ error: err.name });
  });

  db.Step.bulkCreate(payload)
    .then((resp) => {
      if (resp) res.send(resp);
    })
    .catch((err) => {
      console.log(customizedError(err, "PUT update steps"));
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
  const average = req.body.average;
  const notes = req.body.notes;

  db.Note.findOne({
    where: { user_id, recipe_id },
  })
    .then((foundNote) => {
      if (!foundNote) {
        db.Note.create({
          value,
          recipe_id,
          user_id,
        }).catch((err) => {
          console.log(customizedError(err, "POST create Note"));
          res.json({ error: err.name });
        });
        //Increment user's notes
        axios
          .put(`http://localhost:3001/api/users/${user_id}/notes`)
          .then((resp) => {
            if (resp.status !== 200)
              console.log("Increment user's Notes: \n", resp);
          })
          .catch((err) => console.log(err));
        //Update recipe's notes & average
        axios
          .put(`http://localhost:3001/api/recipes/average/${recipe_id}`, {
            value,
            average,
            notes,
          })
          .then((resp) => {
            if (resp.status !== 200) console.log("Increment notes: \n", resp);
          })
          .catch((err) => console.log(err));
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.log(customizedError(err, "POST find Note"));
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

//________________________________________ Friendship

// Create
router.post("/friendships", (req, res) => {
  const user_id = req.body.user_id;
  const popote_id = req.body.popote_id;

  db.Friendship.create({
    user_id,
    popote_id,
  })
    .then((createdFriendship) => {
      if (createdFriendship) {
        //Increment user's popotes
        axios
          .put(`http://localhost:3001/api/users/${user_id}/popotes`)
          .then((resp) => {
            if (resp.status !== 200)
              console.log("Increment user's Popotes: \n", resp);
          })
          .catch((err) => console.log(err));
        res.json(createdFriendship);
      }
    })
    .catch((err) => {
      console.log(customizedError(err, "POST create Friendship"));
      res.json({ error: err.name });
    });
});

// Delete
router.delete("/friendships/:userID", (req, res) => {
  const user_id = req.params.userID;
  const popote_id = req.query.popote_id;

  db.Friendship.destroy({
    where: {
      user_id,
      popote_id,
    },
  })
    .then((deletedFriend) => {
      if (deletedFriend) {
        //Decrement user's popotes
        axios
          .put(`http://localhost:3001/api/users/${user_id}/decrement/popotes`)
          .then((resp) => {
            if (resp.status !== 200) console.log("Decrement popotes: \n", resp);
          })
          .catch((err) => console.log(err));
        return res.json(deletedFriend);
      }
      return res.send("Could not delete friendship.");
    })
    .catch((err) => {
      console.log(customizedError(err, "DELETE Friendship"));
      res.json({ error: err.name });
    });
});

// Retrieve one
router.get("/friendships/:userID", (req, res) => {
  const user_id = req.params.userID;
  const popote_id = req.query.popote_id;

  db.Friendship.findOne({
    where: { user_id, popote_id },
  })
    .then((foundFriendship) => res.json(foundFriendship))
    .catch((err) => {
      console.log(customizedError(err, "GET one Friendship"));
      res.json({ error: err.name });
    });
});

// Retrieve all by user_id
router.get("/friendships", (req, res) => {
  const user_id = req.query.user_id;

  db.Friendship.findAll({
    where: { user_id },
  })
    .then((foundFriendships) => res.json(foundFriendships))
    .catch((err) => {
      console.log(customizedError(err, "GET all User's Friendships"));
      res.json({ error: err.name });
    });
});

//________________________________________ Messages

// Create
router.post("/messages", (req, res) => {
  const user_id = req.body.user_id;
  const popote_id = req.body.popote_id;
  const content = req.body.content;

  db.Message.create({
    user_id,
    popote_id,
    content,
  })
    .then((createdMessage) => res.json(createdMessage))
    .catch((err) => {
      console.log(customizedError(err, "POST create Message"));
      res.json({ error: err.name });
    });
});

// Delete
router.delete("/messages", (req, res) => {
  const user_id = req.query.user_id;
  const popote_id = req.query.popote_id;
  const lastMessageID = req.query.lastMessageID;

  db.Message.destroy({
    where: {
      id: { [Op.lt]: lastMessageID },
      [Op.or]: [
        { user_id, popote_id },
        { user_id: popote_id, popote_id: user_id },
      ],
    },
  })
    .then((deletedFriend) => {
      if (deletedFriend) {
        return res.json(deletedFriend);
      }
      return res.send("Could not delete friendship.");
    })
    .catch((err) => {
      console.log(customizedError(err, "DELETE Messages"));
      res.json({ error: err.name });
    });
});

// Retrieve a conversation
router.get("/messages", (req, res) => {
  const user_id = req.query.user_id;
  const popote_id = req.query.popote_id;

  db.Message.findAll({
    where: {
      [Op.or]: [
        { user_id, popote_id },
        { user_id: popote_id, popote_id: user_id },
      ],
    },
    order: [[ 'createdAt', 'ASC' ]]
  })
    .then((foundMessages) => {
      if (foundMessages.length > 50)
        axios.delete("http://localhost:3001/api/messages", {
          params: {
            popote_id,
            user_id,
            lastMessageID: foundMessages[foundMessages.length - 50].id,
          },
        });
      res.json(foundMessages);
    })
    .catch((err) => {
      console.log(customizedError(err, "GET all Messages"));
      res.json({ error: err.name });
    });
});

//________________________________________ Forums

// Create a forum message
router.post("/forum", (req, res) => {
  const user_id = req.body.user_id;
  const content = req.body.content;

  db.Forum.create({
    user_id,
    content,
  })
    .then((createdForum) => res.json(createdForum))
    .catch((err) => {
      console.log(customizedError(err, "POST Forum message"));
      res.json({ error: err.name });
    });
});

// Retrieve all forum messages
router.get("/forum", (req, res) => {
  db.Forum.findAll({ order: [["createdAt", "DESC"]] })
    .then((foundMessages) => {
      console.log(foundMessages);
      res.json(foundMessages);
    })
    .catch((err) => {
      console.log(customizedError(err, "GET all Forum messages"));
      res.json({ error: err.name });
    });
});

//________________________________________ Notifications

// Retrieve user notifications
router.get("/notification/:userID", (req, res) => {
  db.Notification.findAll({
    where: {
      receiver_id: req.params.userID,
    },
    order: [["createdAt", "DESC"]],
  }).then((UserNotification) => res.json(UserNotification));
});

// Create
router.post("/notification", (req, res) => {
  const isChecked = req.body.isChecked;
  const type = req.body.type;
  const receiver_id = req.body.receiver_id;
  const sender_id = req.body.sender_id;
  const sender_name = req.body.sender_name;

  const recipe_id = req.body.recipe_id;
  const comment_id = req.body.comment_id;
  const note_id = req.body.note_id;
  const message_id = req.body.message_id;
  const friendship_id = req.body.friendship_id;
  const thread_id = req.body.thread_id;
  const like_id = req.body.like_id;

  db.Notification.create({
    isChecked,
    type,
    receiver_id,
    sender_id,
    sender_name,
    recipe_id,
    comment_id,
    note_id,
    message_id,
    friendship_id,
    thread_id,
    like_id
  }).then((createdNotif) => res.json(createdNotif));
});

// Check
router.put("/notification", (req, res) => {
  db.Notification.update({
    isChecked: true
  }, {
    where: {
      id: req.body.notificationIDArray,
    },
  })
    .then((resp) => {
      if (!resp) {
        res.sendStatus(500);
        return console.log("Update notification: \n", resp);
      }
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(customizedError(err, "PUT check notification"));
      res.json({ error: err.name });
    });
});

// Delete
router.delete("/notification/:notificationID", (req, res) => {
  db.Notification.destroy({
    where: {
      id: req.params.notificationID,
    },
  }).catch((err) => {
    console.log(customizedError(err, "DELETE destroy notification"));
    res.json({ error: err.name });
  });
})

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

//________________________________________ Web Sockets (issue: works on browsers but not on mobile)
// // Sockets manager
// const io = require("socket.io")(3002);
// const socketUsers = {};

// io.on("connection", (client) => {
//   console.log("CONNECTION");
//   client.emit("connected", client.id);
//   client.on("userObject", (userObject) => {
//     const user = { ...userObject, socketID: client.id };
//     socketUsers[client.id] = user;
//     client.emit("usersConnected", socketUsers);
//   });

//   client.on("send-message", (messageObj) => {
//     console.log(messageObj);
//     io.emit("broadcastmessage", messageObj);
//   })

//   // When client leave chat room (on unmount component)
//   client.on("disconnection", () => {
//     console.log("socketUsers:", socketUsers);
//     console.log("DISCONNECTION OF", client.id);
//     delete socketUsers[client.id];
//     console.log("socketUsers:", socketUsers);
//     client.emit("disconnected", client.id);
//   });
//   // When client close tab or window
//   client.on("disconnect", () => {
//     console.log("socketUsers:", socketUsers);
//     console.log("CLOSED TAB", client.id);
//     delete socketUsers[client.id];
//     console.log("socketUsers:", socketUsers);
//     client.emit("disconnected", client.id);
//   });
// });
