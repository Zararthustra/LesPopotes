import { useState } from "react";
import { RecipeIngredientsCreation } from "../../components/recipeIngredientsCreation";
import { capitalize } from "../../assets/utils/capitalize";
import { RecipeInfosCreation } from "../../components/recipeInfosCreation";
import Select from "react-select";
import { icons } from "../../assets/utils/importIcons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Host } from "../../assets/utils/host";
import { useRef } from "react";
import { ingredientsList } from "../../assets/utils/ingredientsList";
import { unityList } from "../../assets/utils/unityList";
import { Toaster } from "../../components/toaster";
export const Creation = () => {
  //___________________________________________________ Variables

  const navigate = useNavigate();
  const selectIngredientRef = useRef();
  const selectUnityRef = useRef();
  const toasterRef = useRef(null);
  const clearSelectValues = () => {
    selectIngredientRef.current.setValue("");
    selectUnityRef.current.setValue("");
  };
  const [showButtons, setShowButtons] = useState(true);

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
  const [recipeTitle, setRecipeTitle] = useState("");
  const [nbPers, setNbPers] = useState("");
  const [diff, setDiff] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [bakeMode, setBakeMode] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [bakeTime, setBakeTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [addIngredient, setAddIngredient] = useState("");
  const [addQtt, setAddQtt] = useState(0);
  const [addUnity, setAddUnity] = useState("");
  const [steps, setSteps] = useState([]);
  const [addStep, setAddStep] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [addComment, setAddComment] = useState("");

  // An object shared with child components
  const sharedVars = {
    setNbPers,
    setDiff,
    setType,
    tags,
    setTags,
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
    comments: 0,
    notes: 0,
    signal: 0,
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
      { name: capitalize(addIngredient), quantity: addQtt, unity: addUnity },
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
    let value = document.querySelector(".stepText").value;
    if (!addStep || addStep.trim() === "") return;
    if (!value || value.trim() === "") return;
    setSteps([...steps, capitalize(value)]);
    // Reset input
    document.querySelector(".stepText").value = "";
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

    createRecipe();
    setShowButtons(false);
    setFieldMissing(false);
    toasterRef.current.showToaster();
    setTimeout(() => navigate("/lapopote"), 3000);
  };

  const createRecipe = () => {
    axios
      .post(`${Host}api/recipe`, recipePayload)
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
        createRecipeIngredients(res.data.id);
      })
      .catch((err) => {
        console.log("Error catched: ", err);
      });
  };

  const createRecipeIngredients = async (recipeId) => {
    await axios
      .post(`${Host}api/ingredients/${recipeId}`, {
        ingredients,
      })
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
        createRecipeSteps(recipeId);
      })
      .catch((err) => {
        console.log("Error catched: ", err);
      });
  };

  const createRecipeSteps = async (recipeId) => {
    const stepsFormatedForAPI = steps.map((step, index) => {
      return {
        nbStep: index + 1,
        content: step,
      };
    });

    await axios
      .post(`${Host}api/steps/${recipeId}`, {
        stepsFormatedForAPI,
      })
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
        <RecipeInfosCreation sharedVars={sharedVars} />
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
              pattern="[0-9]*"
              maxLength={3}
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
              title="Ajouter un ingrédient"
            />
          </div>

          <RecipeIngredientsCreation sharedVars={sharedVars} />
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
                    <div className="groupButtons">
                      <div
                        className="cancelEditButtonStep"
                        onClick={() => setIsEditing(false)}
                        title="Annuler la modification"
                      />
                      <div
                        className="confirmEditButtonStep"
                        onClick={() => handleEditStep(index)}
                        title="Confirmer la modification"
                      />
                    </div>
                  ) : (
                    <div className="groupButtons">
                      <div
                        className="editButtonStep"
                        onClick={() => setIsEditing(index)}
                        title="Modifier l'étape"
                      />
                      <div
                        className="removeButtonStep"
                        onClick={() => handleDeleteStep(index)}
                        title="Supprimer l'étape"
                      />
                    </div>
                  )}
                </div>
                {isEditing === index ? (
                  <input
                    type="text"
                    className="editStepText"
                    defaultValue={step}
                    onChange={handleStep}
                  />
                ) : (
                  <p>{step}</p>
                )}
              </li>
            );
          })}
          {!Number.isInteger(isEditing) && (
            <li className="step">
              <div className="addStep">
                <div className="stepTitle">Ajouter une étape</div>
                <div
                  className="addButtonStep"
                  title="Ajouter l'étape"
                  onClick={handleAddStep}
                />
              </div>
              <input
                type="text"
                className="stepText"
                onKeyDown={handlePressEnter}
                onChange={handleStep}
                placeholder="Décrire avec précision. Une étape = une action."
              />
            </li>)}
        </ul>
        <div className="separateCreation"></div>
        <div className="recipeComment">
          <h3>Quelque chose à ajouter ?</h3>
          <textarea
            type="text"
            placeholder="Commentaire, astuce, lien, recommandation, ..."
            className="authorRecipeComment"
            onChange={handleComment}
          />
        </div>
        <Toaster
          type={fieldMissing !== false ? "warning" : "success"}
          message={
            fieldMissing !== false
              ? `${fieldMissing} manquant`
              : "Recette enregistrée ! Redirection ..."
          }
          ref={toasterRef}
        />
        {showButtons && (
          <div className="finalButtons">
            <button
              className="creationIngredientsButton"
              onClick={handleSaveRecipe}
            >
              Enregistrer
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
