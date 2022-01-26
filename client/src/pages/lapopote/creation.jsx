import { useState } from "react";
import { RecipeIngredientsCreation } from "../../components/recipeIngredientsCreation";
import { capitalize } from "../../assets/utils/capitalize";
import { RecipeInfosCreation } from "../../components/recipeInfosCreation";
import { Recipes } from "../../assets/utils/recipes";
import Select from "react-select";
import { icons } from "../../assets/utils/importIcons";
import { images } from "../../assets/utils/importImages";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Host } from "../../assets/utils/host";
import { useRef } from "react";

export const Creation = () => {
  //___________________________________________________ Variables

  const navigate = useNavigate();
  const selectInputRef = useRef();

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      fontSize: "0.8em",
      cursor: "pointer",
      border: state.isFocused ? "2px var(--popote) solid" : "1px black solid",
      boxShadow: "none",
      "&:hover": {
        border: "2px var(--popote) solid",
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

  const [userId, setUserId] = useState(0);
  const [recipe, setRecipe] = useState({});
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeImage, setRecipeImage] = useState(images.friends);
  const formData = new FormData();
  const [nbPers, setNbPers] = useState("");
  const [diff, setDiff] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [bakeMode, setBakeMode] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [bakeTime, setBakeTime] = useState(0);
  const [ingredients, setIngredients] = useState([]); //useState(Recipes[0].ingredients);
  const [addIngredient, setAddIngredient] = useState("");
  const [addQtt, setAddQtt] = useState(0);
  const [addUnity, setAddUnity] = useState("");
  const [steps, setSteps] = useState([]); //useState(Recipes[0].steps);
  const [addStep, setAddStep] = useState("");
  const [addComment, setAddComment] = useState("");

  // An object shared with child components for better lisibility
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

  //___________________________________________________ Functions

  // Load data when mounting
  // useEffect(() => {
  //   let isSubscribed = true;

  //   axios.get(`${Host}api/recipes/${recetteID}`).then((res) => {
  //     if (isSubscribed) setRecipe(res.data);
  //   });

  //   return () => (isSubscribed = false);
  // }, [recetteID]);

  // Infos
   const handleUserFile = (event) => {
  //   console.log('event :', event.target.files[0]);
     const uploadedImage = event.target.files[0]; //URL.createObjectURL(event.target.files[0]);
  //   for (var value of formData.values()) {
  //     console.log("formData",value);
  //  }
     formData.append("image", uploadedImage);
  //   for (var value of formData.values()) {
  //     console.log("formData",value);
  //  }
     setRecipeImage(uploadedImage);
   };

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
    if (addQtt === 0) return;
    setIngredients([
      ...ingredients,
      { name: capitalize(addIngredient), quantity: addQtt, unity: addUnity },
    ]);

    document.getElementsByClassName("selectQuantity")[0].value = "";
    setAddQtt(0);
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
  const handleAddStep = () => {
    let value = document.getElementsByClassName("stepText")[0].value;
    if (!addStep) return;
    setSteps([...steps, capitalize(value)]);
    // Reset input
    document.getElementsByClassName("stepText")[0].value = "";
  };

  // Comment
  const handleComment = (event) => {
    setAddComment(event.currentTarget.value);
  };

  //___________________________________________________ API Calls

  // Save created recipe to DB
  const handleSaveRecipe = () => {
    createRecipe();
    navigate("/accueil");
  };

  const createRecipe = async () => {
    await axios
      .post(`${Host}api/recipe`, {
        name: recipeTitle,
        image: formData,
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
      })
      .then((res) => {
        if (!res) return console.log("No response from server");
        if (res.data.error) return console.log(res.data);
        setUserId(res.data.user_id);
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
        <img
          className="creationImg"
          src={recipeImage}
          alt="illustration recette"
        />

        <label className="imgButton">
          <img src={icons.imageBlank} alt="importer" className="imageBlank" />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            name="image"
            onChange={handleUserFile}
          />
          Prendre ou importer une photo
        </label>

        <input
          className="recipeTitleCreation"
          placeholder="Titre"
          type="text"
          maxLength="30"
          value={recipeTitle}
          onChange={handleTitleChange}
        />
        <RecipeInfosCreation infos={recipe} sharedVars={sharedVars} />
        <div className="separateCreation" />
        <h3 className="creationTitles Ingredients">Ingrédients</h3>
        <div className="ingredientsContainer">
          <div className="creationIngredients">
            <Select
              ref={selectInputRef}
              placeholder="Ingrédient"
              styles={selectStyle}
              className="selectIngredient"
              onChange={handleIngredient}
              options={[
                { value: "sucre", label: "Sucre" },
                { value: "lait", label: "Lait" },
                { value: "farine", label: "Farine" },
                { value: "tomate", label: "Tomate" },
                { value: "avocat", label: "Avocat" },
                { value: "concombre", label: "Concombre" },
              ]}
            />
            <input
              type="text"
              pattern="[0-9]*"
              placeholder="Qté"
              className="selectQuantity"
              onChange={handleQuantity}
              min="0"
            />
            <Select
              isSearchable={false}
              placeholder="Unité"
              styles={selectStyle}
              className="selectUnity"
              onChange={handleUnity}
              options={[
                { value: "", label: "Sans unité" },
                { value: "L", label: "L" },
                { value: "dl", label: "dl" },
                { value: "cl", label: "cl" },
                { value: "ml", label: "ml" },
                { value: "G", label: "G" },
                { value: "kg", label: "kg" },
                { value: "mg", label: "mg" },
              ]}
            />
            <img
              src={icons.plus}
              className="addIngredient"
              onClick={handleAddIngredientRow}
              alt="ajouter un ingrédient"
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
                  <div
                    className="removeButtonStep"
                    onClick={() => handleDeleteStep(index)}
                  />
                </div>
                <p>{step}</p>
              </li>
            );
          })}
          <li>
            <div className="addStep">
              <div className="stepTitle">Ajouter une étape</div>
              <div className="addButtonStep" onClick={handleAddStep} />
            </div>
            <textarea
              type="text"
              className="stepText"
              onChange={handleStep}
              placeholder="Décrire avec précision. Une étape = une action."
            />
          </li>
        </ul>
        <button onClick={() => console.log("Ing: ", ingredients)}>LOG</button>
        <div className="separateCreation"></div>
        <div className="recipeComment">
          <h3>Quelque chose à ajouter ?</h3>
          <textarea
            type="text"
            placeholder="Commentaire, astuce, lien, recommandation, ..."
            className="authorComment"
            onChange={handleComment}
          />
        </div>
        <div className="finalButtons">
          <button
            className="creationIngredientsButton"
            onClick={handleSaveRecipe}
          >
            Enregistrer
          </button>
          <div className="cancel" onClick={() => navigate("/lapopote")}>
            Annuler
          </div>
        </div>
      </div>
    </main>
  );
};
