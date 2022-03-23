import { useState } from "react";
import { capitalize } from "../../assets/utils/capitalize";
import Select from "react-select";
import { icons } from "../../assets/utils/importIcons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Host } from "../../assets/utils/host";
import { useRef } from "react";
import { ingredientsList } from "../../assets/utils/ingredientsList";
import { unityList } from "../../assets/utils/unityList";
import { RecipeInfosModification } from "../../components/recipeInfosModification";
import { RecipeIngredientsModification } from "../../components/recipeIngredientsModification";
import { refreshPage } from "../../assets/utils/refreshPage";
import { Toaster } from "../../components/toaster";

export const Modification = ({ recipe, recipeIngredients, recipeSteps }) => {
  //___________________________________________________ Variables

  const navigate = useNavigate();
  const toasterRef = useRef(null);
  const selectIngredientRef = useRef();
  const selectUnityRef = useRef();
  const [showButtons, setShowButtons] = useState(true);
  const clearSelectValues = () => {
    selectIngredientRef.current.setValue("");
    selectUnityRef.current.setValue("");
  };

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      fontSize: "0.8em",
      cursor: "pointer",
      border: state.isFocused ? "1px var(--popote) solid" : "1px black solid",
      boxShadow: "none",
      "&:hover": {
        border: "1px var(--popote) solid",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "var(--dark-popote)" : "white",
      color: state.isFocused ? "white" : "var(--dark-popote)",
      "&:hover": {
        backgroundColor: "var(--dark-popote)",
        color: "white",
      },
    }),
  };
  const [fieldMissing, setFieldMissing] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState(recipe.name);
  const [nbPers, setNbPers] = useState(recipe.nbPers);
  const [diff, setDiff] = useState(recipe.difficulty);
  const [type, setType] = useState(recipe.type);
  const [tags, setTags] = useState(recipe.tags.split(","));
  const [bakeMode, setBakeMode] = useState(recipe.bakeType);
  const [prepTime, setPrepTime] = useState(recipe.prepTime);
  const [bakeTime, setBakeTime] = useState(recipe.bakeTime);
  const [ingredients, setIngredients] = useState(recipeIngredients);
  const [addIngredient, setAddIngredient] = useState("");
  const [addQtt, setAddQtt] = useState(0);
  const [addUnity, setAddUnity] = useState("");
  const [steps, setSteps] = useState(recipeSteps);
  const [addStep, setAddStep] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [addComment, setAddComment] = useState(recipe.authorComment);

  // An object shared with child components
  const sharedVars = {
    nbPers,
    setNbPers,
    diff,
    setDiff,
    type,
    setType,
    tags,
    setTags,
    bakeMode,
    setBakeMode,
    prepTime,
    setPrepTime,
    bakeTime,
    setBakeTime,
    ingredients,
    setIngredients,
  };

  const recipePayload = {
    name: recipeTitle,
    tags: JSON.stringify(tags).replace(/[[\]"]/g, ""),
    nbPers,
    isNbVariable: true,
    type: type,
    author: localStorage.getItem("username"),
    user_id: localStorage.getItem("userid"),
    bakeTime,
    prepTime,
    bakeType: bakeMode,
    difficulty: diff,
    authorComment: addComment,
  };

  //___________________________________________________ Functions

  // Infos

  const handleTitleChange = (event) => {
    setRecipeTitle(event.currentTarget.value);
  };

  // Ingredient
  const handleQuantity = (event) => {
    const className = event.currentTarget.className;
    const value = parseInt(event.currentTarget.value);

    if (className === "selectQuantity") {
      if (value < 0 || isNaN(value)) return setAddQtt(0);
      setAddQtt(value);
    }
  };
  const handleUnity = (event) => {
    setAddUnity(event.value);
  };
  const handleIngredient = (event) => {
    setAddIngredient(event.value);
  };
  const handleAddIngredientRow = () => {
    if (!addIngredient) return;
    if (addQtt < 0) return;
    // Avoid to add same ingredient
    if (ingredients.find(({ name }) => name === capitalize(addIngredient)))
      return;

    setIngredients([
      ...ingredients,
      {
        name: capitalize(addIngredient),
        quantity: addQtt,
        unity: addUnity,
        recipe_id: recipe.id,
      },
    ]);

    document.getElementsByClassName("selectQuantity")[0].value = "";
    setAddQtt(0);
    clearSelectValues();
  };

  // Step
  const handleStep = (event) => {
    setAddStep(event.currentTarget.value);
  };
  const handleDeleteStep = (index) => {
    let tmpSteps = [...steps];
    tmpSteps.splice(index, 1);
    setSteps(tmpSteps);
  };
  const handleEditStep = (index) => {
    if (!addStep || addStep.trim() === "") return;
    let tmpSteps = [...steps];
    tmpSteps[index] = addStep;
    setIsEditing(false);
    setSteps(tmpSteps);
  };
  const handleAddStep = () => {
    let value = document.getElementsByClassName("stepText")[0].value;
    if (!addStep || addStep.trim() === "") return;
    setSteps([...steps, capitalize(value)]);
    // Reset input
    document.getElementsByClassName("stepText")[0].value = "";
    setAddStep("")
  };
  const handlePressEnter = (event) => {
    if (event.key === "Enter") handleAddStep();
  };

  // Comment
  const handleComment = (event) => {
    setAddComment(event.currentTarget.value);
  };

  //___________________________________________________ API Calls

  // Save created recipe to DB
  const handleSaveRecipe = () => {
    if (!recipeTitle) {
      setFieldMissing("Titre");
      toasterRef.current.showToaster();
      return;
    }
    if (!type) {
      setFieldMissing("Type");
      toasterRef.current.showToaster();
      return;
    }
    if (!nbPers) {
      setFieldMissing("Nombre de personnes");
      toasterRef.current.showToaster();
      return;
    }
    if (!diff) {
      setFieldMissing("Difficulté");
      toasterRef.current.showToaster();
      return;
    }
    if (!prepTime) {
      setFieldMissing("Temps de préparation");
      toasterRef.current.showToaster();
      return;
    }
    if (ingredients.length === 0) {
      setFieldMissing("Ingrédient");
      toasterRef.current.showToaster();
      return;
    }
    if (steps.length === 0) {
      setFieldMissing("Etape");
      toasterRef.current.showToaster();
      return;
    }

    updateRecipe();
    setShowButtons(false);
    toasterRef.current.showToaster();
    setTimeout(() => refreshPage(true), 3000);
  };

  const updateRecipe = () => {
    axios
      .put(`${Host}api/recipes/${recipe.id}`, recipePayload)
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
      })
      .catch((err) => {
        console.log("Error catched: ", err);
      });

    updateRecipeIngredients(recipe.id);
    updateRecipeSteps(recipe.id);
  };

  const updateRecipeIngredients = (recipeId) => {
    axios
      .put(`${Host}api/ingredients/${recipeId}`, ingredients)
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
      })
      .catch((err) => {
        console.log("Error catched: ", err);
      });
  };

  const updateRecipeSteps = (recipeId) => {
    const stepsFormatedForAPI = steps.map((step, index) => {
      return {
        nbStep: index + 1,
        content: step,
        recipe_id: recipeId,
      };
    });

    axios
      .put(`${Host}api/steps/${recipeId}`, stepsFormatedForAPI)
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
      })
      .catch((err) => {
        console.log("Error catched: ", err);
      });
  };

  //___________________________________________________ Render

  return (
    <main className="recipePage">
      <Toaster
        type={fieldMissing !== false ? "warning" : "success"}
        message={
          fieldMissing !== false
            ? `${fieldMissing} manquant`
            : "Modification enregistrée. Redirection ..."
        }
        ref={toasterRef}
      />
      <div className="recipeContainer">
        <div className="overlayCreationImage">
          <img
            src={require("../../assets/icons/close.png").default}
            className="closeRecipe"
            onClick={() => navigate(-1)}
            alt="fermer"
            title="Fermer"
          />
        </div>
        <input
          className="recipeTitleCreation"
          placeholder="Titre"
          type="text"
          maxLength="40"
          value={recipeTitle}
          onChange={handleTitleChange}
        />
        <RecipeInfosModification sharedVars={sharedVars} />
        <div className="separateCreation" />
        <h3 className="creationTitles Ingredients">Ingrédients</h3>
        <div className="ingredientsContainer">
          <div className="creationIngredients">
            <Select
              ref={selectIngredientRef}
              placeholder="Ingrédient"
              styles={selectStyle}
              className="selectIngredient"
              onChange={handleIngredient}
              options={ingredientsList}
            />
            <input
              type="text"
              maxLength={3}
              pattern="[0-9]*"
              placeholder="Qté"
              className="selectQuantity"
              onChange={handleQuantity}
              min="0"
            />
            <Select
              ref={selectUnityRef}
              placeholder="Unité"
              styles={selectStyle}
              className="selectUnity"
              onChange={handleUnity}
              options={unityList}
            />
            <img
              src={icons.plus}
              className="addIngredient"
              onClick={handleAddIngredientRow}
              alt="ajouter un ingrédient"
            />
          </div>

          <RecipeIngredientsModification sharedVars={sharedVars} />
        </div>
        <div className="separateCreation" />
        <h3 className="creationTitles Etapes">Etapes</h3>
        <ul className="steps">
          {steps.map((step, index) => {
            return (
              <li key={index} className="step">
                <div className="addStep">
                  <div className="stepTitle">Etape {index + 1}</div>
                  {isEditing === index ? (
                    <div
                      className="confirmEditButtonStep"
                      onClick={() => handleEditStep(index)}
                    />
                  ) : (
                    <div className="groupButtons">
                      <div
                        className="editButtonStep"
                        onClick={() => setIsEditing(index)}
                      />
                      <div
                        className="removeButtonStep"
                        onClick={() => handleDeleteStep(index)}
                      />
                    </div>
                  )}
                </div>
                {isEditing === index ? (
                  <input
                    type="text"
                    className="stepText"
                    defaultValue={step}
                    onChange={handleStep}
                  />
                ) : (
                  <p>{step}</p>
                )}
              </li>
            );
          })}
          <li>
            <div className="addStep">
              <div className="stepTitle">Ajouter une étape</div>
              <div className="addButtonStep" onClick={handleAddStep} />
            </div>
            <input
              type="text"
              className="stepText"
              onKeyDown={handlePressEnter}
              onChange={handleStep}
              placeholder="Décrire avec précision. Une étape = une action."
            />
          </li>
        </ul>
        <div className="separateCreation"></div>
        <div className="recipeComment">
          <h3>Quelque chose à ajouter ?</h3>
          <textarea
            defaultValue={recipe.authorComment}
            type="text"
            placeholder="Commentaire, astuce, lien, recommandation, ..."
            className="authorRecipeComment"
            onChange={handleComment}
          />
        </div>
        {showButtons && (
          <div className="finalButtons">
            <button
              className="creationIngredientsButton"
              onClick={handleSaveRecipe}
            >
              Modifier
            </button>
            <div className="cancel" onClick={() => navigate(-1)}>
              Annuler
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
