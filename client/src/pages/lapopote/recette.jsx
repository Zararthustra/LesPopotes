import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { Host } from "../../assets/utils/host";
import { Comment } from "../../components/comment";
import { RecipeInfos } from "../../components/recipeInfos";
import { RecipeIngredients } from "../../components/recipeIngredients";
import { icons } from "../../assets/utils/importIcons";
import ClipLoader from "react-spinners/ClipLoader";
import { Modification } from "../profile/modification";
import { Toaster } from "../../components/toaster";
import { images } from "../../assets/utils/importImages"

export const Recette = () => {
  //___________________________________________________ Variables
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { recetteID } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isModifying, setIsModifying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNoted, setIsNoted] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChecklist, setLoadingChecklist] = useState(false);
  const [ingredientsChecklistOK, setIngredientsChecklistOK] = useState(false);
  const [ingredientsChecklistKO, setIngredientsChecklistKO] = useState(false);
  const [stepsChecklistOK, setStepsChecklistOK] = useState(false);
  const [stepsChecklistKO, setStepsChecklistKO] = useState(false);
  const [checklistCredentials, setChecklistCredentials] = useState({});
  axios.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
  const toasterRef = useRef(null);

  //___________________________________________________ UseEffect

  // Load data when mounting
  useEffect(() => {
    let TMPComments = [];
    let isSubscribed = true;
    setLoading(true);

    // Get recipe Infos
    const getRecipe = async () => {
      const res = await axios.get(`${Host}api/recipes/${recetteID}`);
      if (res) setRecipe(res.data);
    };
    if (isSubscribed) getRecipe();

    // Get recipe Ingredients
    const getIngredients = async () => {
      const res = await axios.get(`${Host}api/ingredients/${recetteID}`);
      if (res) setIngredients(res.data);
    };
    if (isSubscribed) getIngredients();

    // Get recipe Steps
    const getSteps = async () => {
      const res = await axios.get(`${Host}api/steps/${recetteID}`);
      if (res) setSteps(res.data);
    };
    if (isSubscribed) getSteps();

    // IsFavorite ?
    const getFavorite = async () => {
      const res = await axios.get(`${Host}api/favorites/${recetteID}`, {
        params: { userId: localStorage.getItem("userid") },
      });
      if (res.data) setIsFavorite(true);
    };
    if (localStorage.getItem("userid") && isSubscribed) getFavorite();

    // Get recipe Comments
    const getComments = async () => {
      const res = await axios.get(`${Host}api/comments/${recetteID}`);
      if (res.data) {
        let commentsArray = [];
        res.data.map((item) => {
          return commentsArray.push({ ...item, note: 0 });
        });
        TMPComments = commentsArray;
        setComments(commentsArray);
      }
    };

    // Get Notes (get comments to map users notes, and set user's vote if already voted)
    const getNotes = async () => {
      await getComments();

      const res = await axios.get(`${Host}api/notes/${recetteID}`, {
        params: { userId: localStorage.getItem("userid") },
      });

      if (res.data) {
        if (res.data.usersNote) {
          setIsNoted(getUsersNote(res.data.usersNote));
          setHasVoted(true);
        }

        const notes = res.data.noteArray;
        const addNotesToCommentsObject = TMPComments.map((comment) => {
          const getUserNote = notes.filter((note) => {
            if (note.user_id === comment.user_id) return note.note;
            return null;
          });
          return { ...comment, note: getUserNote[0]?.note };
        });
        setComments(addNotesToCommentsObject);
        setLoading(false);
      }
    };
    if (isSubscribed) getNotes();

    // Get checklist credentials
    const getChecklistCredentials = async () => {
      const res = await axios.get(`${Host}api/checklist/users/${localStorage.getItem("userid")}`);
      if (res) setChecklistCredentials({
        name: res.data.name,
        password: res.data.password,
      });
    };
    if (isSubscribed) getChecklistCredentials();

    return () => (isSubscribed = false);
  }, [recetteID]);

  //___________________________________________________ Functions

  const recipeTypeIcon = () => {
    if (recipe.type === "apero") return icons.apero
    if (recipe.type === "entree") return icons.entree
    if (recipe.type === "plat") return icons.plat
    if (recipe.type === "dessert") return icons.dessert
    if (recipe.type === "boisson") return icons.boisson
    return icons.autre
  }

  const removeLastUrlSegment = (url) => {
    const lastSegment = url.split("/").pop();
    return url.replace(`/${lastSegment}`, "");
  };

  const copyRecipeUrl = () => {
    try {
      navigator.clipboard
        .writeText(window.location.href)
        .then(setIsCopied(true));
    } catch {
      alert(window.location.href);
      setIsCopied(true);
    }
  };

  const deleteRecipe = () => {
    axios
      .delete(`${Host}api/recipes/${recetteID}`, {
        params: {
          user_id: localStorage.getItem("userid"),
        },
      })
      .then((res) => {
        if (res.data) {
          setIsFavorite(false);
          setIsDeleted(true);
          toasterRef.current.showToaster();
          setTimeout(() => navigate('/lapopote'), 3000);
        }
      });
  };

  //________________ Favorite
  const addToFavorites = () => {
    setIsFavorite(false);
    axios
      .post(`${Host}api/favorites`, {
        recipe_id: recetteID,
        user_id: localStorage.getItem("userid"),
      })
      .then((res) => {
        if (res.data) {
          setIsFavorite(true);
          toasterRef.current.showToaster();
        }
      });
  };
  const removeFromFavorites = () => {
    setIsFavorite(true);
    axios
      .delete(`${Host}api/favorites/${recetteID}`, {
        params: { userId: localStorage.getItem("userid") },
      })
      .then((res) => {
        if (res.data) {
          setIsFavorite(false);
          toasterRef.current.showToaster();
        }
      });
  };

  //________________ Opinion Note
  const getUsersNote = (note) => {
    if (note === 1) return { heart1: true };
    if (note === 2)
      return {
        heart1: true,
        heart2: true,
      };
    if (note === 3)
      return {
        heart1: true,
        heart2: true,
        heart3: true,
      };
    if (note === 4)
      return {
        heart1: true,
        heart2: true,
        heart3: true,
        heart4: true,
      };
    if (note === 5)
      return {
        heart1: true,
        heart2: true,
        heart3: true,
        heart4: true,
        heart5: true,
      };
  };
  const toggleHearts = (event) => {
    if (hasVoted) return;
    const heartID = event.currentTarget.id;

    if (heartID === "heart1") setIsNoted({ heart1: true });
    if (heartID === "heart2") setIsNoted({ heart1: true, heart2: true });
    if (heartID === "heart3")
      setIsNoted({ heart1: true, heart2: true, heart3: true });
    if (heartID === "heart4")
      setIsNoted({ heart1: true, heart2: true, heart3: true, heart4: true });
    if (heartID === "heart5")
      setIsNoted({
        heart1: true,
        heart2: true,
        heart3: true,
        heart4: true,
        heart5: true,
      });
  };
  const addNote = () => {
    const note = Object.keys(isNoted).length;
    let voteButton = document.querySelector(
      ".creationIngredientsButton"
    )?.classList;

    if (voteButton && note > 0) {
      axios
        .post(`${Host}api/notes`, {
          recipe_id: recetteID,
          user_id: localStorage.getItem("userid"),
          value: note,
          average: parseFloat(recipe.average),
          notes: recipe.notes,
        })
        .then((res) => {
          if (res.status === 200) {
            setHasVoted(true);
            voteButton.remove("creationIngredientsButton");
            voteButton.add("doneButton");
          }
        });

      axios
        .post(`${Host}api/notification`, {
          sender_id: localStorage.getItem("userid"),
          sender_name: localStorage.getItem("username"),
          receiver_id: recipe.user_id,
          recipe_id: recipe.id,
          type: 'note'
        })
    }
  };

  //________________ Opinion Comment
  const handleComment = (event) => {
    setComment(event.currentTarget.value);
  };
  const handlePressEnter = (event) => {
    if (event.key === "Enter") addComment();
  };
  const addComment = () => {
    if (!comment.trim()) {
      document.querySelector(".userCommentTextArea").value = "";
      setComment("");
      return;
    }
    if (comment) {
      axios
        .post(
          `${Host}api/comments`,
          {
            content: comment,
            author: localStorage.getItem("username"),
            user_id: localStorage.getItem("userid"),
          },
          { params: { recipe_id: recetteID } }
        )
        .then((res) => {
          if (res.status === 200) {
            setComments([
              { ...res.data, note: Object.keys(isNoted).length },
              ...comments,
            ]);
            document.querySelector(".userCommentTextArea").value = "";
            setComment("");
          }
        })
        .catch((err) => {
          console.log("Error catched: ", err);
        });

      axios
        .post(`${Host}api/notification`, {
          sender_id: localStorage.getItem("userid"),
          sender_name: localStorage.getItem("username"),
          receiver_id: recipe.user_id,
          recipe_id: recipe.id,
          type: 'comment'
        })
    }
  };

  const checklistPayload = {
    recipeName: recipe.name,
    credentials: checklistCredentials,
    ingredients,
    steps
  }

  const addIngredientsToChecklist = async () => {
    setLoadingChecklist(true)
    if (Object.keys(checklistCredentials).length === 0) {
      setLoadingChecklist(false)
      return setIngredientsChecklistKO(true)
    }
    await axios
      .post(`${Host}api/checklist/ingredients`, checklistPayload).then((res) => {
        if (res.status === 201) setIngredientsChecklistOK(true)
        else setIngredientsChecklistKO(true)
      })
    setLoadingChecklist(false)
  }
  const addStepsToChecklist = async () => {
    setLoadingChecklist(true)
    if (Object.keys(checklistCredentials).length === 0) {
      setLoadingChecklist(false)
      return setStepsChecklistKO(true)
    }
    await axios
      .post(`${Host}api/checklist/steps`, checklistPayload).then((res) => {
        if (res.status === 201) setStepsChecklistOK(true)
        else setStepsChecklistKO(true)
      })
    setLoadingChecklist(false)
  }

  //___________________________________________________ Render

  if (loading)
    return (
      <main className="recipePage">
        <div className="loaderSpacer" />
        <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
      </main>
    );

  if (isModifying)
    return (
      <Modification
        recipe={recipe}
        recipeIngredients={ingredients}
        recipeSteps={steps.map((step) => step.content)}
      />
    );

  return (
    <main className="recipePage">
      <Toaster
        type={isDeleted ? "success" : "info"}
        message={
          isFavorite
            ? "Recette ajoutée aux favoris"
            : isDeleted
              ? "Recette supprimée. Redirection ..."
              : "Recette supprimée des favoris"
        }
        ref={toasterRef}
      />
      <div className="recipeContainer">
        {!isDeleted && (
          <>
            {isDeleting ? (
              <div className="overlayImage">
                <div className="isDeletingRecipe">
                  Supprimer ?
                  <button className="confirmDel green" onClick={deleteRecipe} title="Confirmer">
                    Oui
                  </button>
                  <button
                    className="confirmDel red"
                    onClick={() => setIsDeleting(false)}
                    title="Infirmer"
                  >
                    Non
                  </button>
                </div>
              </div>
            ) : (
              <div className="overlayImage">
                <div className="leftOverlay">
                  {localStorage.getItem("username") && (
                    <>
                      {isFavorite ? (
                        <img
                          src={
                            require("../../assets/icons/star-checked.png")
                              .default
                          }
                          className="starChecked"
                          onClick={removeFromFavorites}
                          alt="retirer des recettes favorites"
                          title="Retirer des recettes favorites"
                        />
                      ) : (
                        <img
                          onClick={addToFavorites}
                          src={require("../../assets/icons/star.png").default}
                          className="star"
                          alt="ajouter aux recettes favorites"
                          title="Ajouter aux recettes favorites"
                        />
                      )}
                      {isCopied ? (
                        <div className="copiedRecipe">Lien copié</div>
                      ) : (
                        <img
                          src={require("../../assets/icons/copy.png").default}
                          className="copyRecipe"
                          onClick={() => copyRecipeUrl()}
                          alt="copier le lien de la recette"
                          title="Copier le lien de la recette"
                        />
                      )}
                    </>
                  )}
                  {capitalize(localStorage.getItem("username")) ===
                    capitalize(recipe.author) && (
                      <img
                        src={require("../../assets/icons/edit.png").default}
                        className="editRecipe"
                        onClick={() => setIsModifying(true)}
                        alt="modifier ma recette"
                        title="Modifier ma recette"
                      />
                    )}
                  {capitalize(localStorage.getItem("username")) ===
                    capitalize(recipe.author) && (
                      <img
                        src={require("../../assets/icons/delete.png").default}
                        className="deleteRecipe"
                        onClick={() => setIsDeleting(true)}
                        alt="supprimer ma recette"
                        title="Supprimer ma recette"
                      />
                    )}
                </div>
                <img
                  src={require("../../assets/icons/close.png").default}
                  className="closeRecipe"
                  onClick={() => navigate(removeLastUrlSegment(location))}
                  alt="fermer"
                  title="Fermer"
                />
              </div>
            )}
          </>
        )}

        <div className="recipeTitle">
          {recipe.name && capitalize(recipe.name)}
        </div>
        <div className="separatePopote"></div>
        <div className="typeAndDoneBy">
          <img className="recipeType" src={recipeTypeIcon()} alt={"Type " + recipe.type} title={"Type " + recipe.type} />
          <div
            className="doneBy"
            onClick={() => navigate(`/lespopotes/${recipe.author}`)}
          >
            {recipe.author && capitalize(recipe.author)}
          </div>
        </div>
        <RecipeInfos infos={recipe} />
        <div className="separatePopote"></div>
        <RecipeIngredients ingredients={ingredients} />
        
        {loadingChecklist ?
          <ClipLoader css={""} color={"#f5a76c"} loading={loadingChecklist} size={50} /> :
          ingredientsChecklistOK ?
            <div style={{ display: "flex", alignItems: "center", textAlign: "center", color: "var(--dark-popotes)", marginBottom: "1em" }}>
              Ingrédients ajoutés à votre checklist avec succès
              <img src={icons.ok} className="toasterIcon" alt="succès" />
            </div> :
            ingredientsChecklistKO ?
              <div className="checklistKO">
                <h2>Aucun compte connecté !</h2>
                <div>Ajoutez votre compte <strong>Checklist</strong> dans</div>
                <div className="addToChecklist" onClick={() => navigate("/profil")}>
                  <img
                    className="checklist"
                    src={icons.profile}
                    alt="mon compte"
                  />Mon profil</div>
                <div>ou alors</div>
                <a className="addToChecklist" href="https://checklist.arthurmayer.fr">
                  <img
                    className="checklist"
                    src={images.checklist}
                    alt="checklist"
                  />Créez un compte</a>
              </div> :
              <div className="addToChecklist" onClick={addIngredientsToChecklist} title="Ajouter les ingrédients à ma checklist">
                <img
                  className="checklist"
                  src={images.checklist}
                  alt="checklist"
                />
                Ajouter à ma checklist
              </div>
        }

        <div className="separatePopote"></div>
        <ul className="steps">
          {steps.map((step, index) => {
            return (
              <li key={index} className="step">
                <div className="stepTitle">Etape {step.nbStep}</div>
                <p>{step.content}</p>
              </li>
            );
          })}
        </ul>

        {loadingChecklist ?
          <ClipLoader css={""} color={"#f5a76c"} loading={loadingChecklist} size={50} /> :
          stepsChecklistOK ?
            <div style={{ display: "flex", alignItems: "center", color: "var(--dark-popotes)", marginBottom: "1em" }}>
              Etapes ajoutées à votre checklist avec succès
              <img src={icons.ok} className="toasterIcon" alt="succès" />
            </div> :
            stepsChecklistKO ?
              <div className="checklistKO">
                <h2>Aucun compte connecté !</h2>
                <div>Ajoutez votre compte <strong>Checklist</strong> dans</div>
                <div className="addToChecklist" onClick={() => navigate("/profil")} >
                  <img
                    className="checklist"
                    src={icons.profile}
                    alt="mon compte"
                  />Mon profil</div>
                <div>ou alors</div>
                <a className="addToChecklist" href="https://checklist.arthurmayer.fr">
                  <img
                    className="checklist"
                    src={images.checklist}
                    alt="checklist"
                  />Créez un compte</a>
              </div> :
              <div className="addToChecklist" onClick={addStepsToChecklist} title="Ajouter les étapes à ma checklist">
                <img
                  className="checklist"
                  src={images.checklist}
                  alt="checklist"
                />
                Ajouter à ma checklist
              </div>
        }

        {recipe.authorComment ? (
          <div className="ifAuthorComment">
            <div className="separatePopote"></div>
            <div className="recipeComment">
              <h3>
                Commentaire de {recipe.author && capitalize(recipe.author)}
              </h3>
              <div className="guillemets">
                <p>{"<< "}</p>
                <p>
                  {recipe.authorComment && capitalize(recipe.authorComment)}
                </p>
                <p>{" >>"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {capitalize(localStorage.getItem("username")) !==
          (recipe.author && capitalize(recipe.author)) &&
          localStorage.getItem("username") && (
            <>
              <div className="separatePopote"></div>
              <div className="addNote">
                <div className="hearts">
                  <img
                    id="heart1"
                    className="heart"
                    onClick={toggleHearts}
                    src={isNoted.heart1 ? icons.fullHeart : icons.emptyHeart}
                    alt="noter 1/5"
                    title="noter 1/5"
                  />
                  <img
                    id="heart2"
                    className="heart"
                    onClick={toggleHearts}
                    src={isNoted.heart2 ? icons.fullHeart : icons.emptyHeart}
                    alt="noter 2/5"
                    title="noter 2/5"
                  />
                  <img
                    id="heart3"
                    className="heart"
                    onClick={toggleHearts}
                    src={isNoted.heart3 ? icons.fullHeart : icons.emptyHeart}
                    alt="noter 3/5"
                    title="noter 3/5"
                  />
                  <img
                    id="heart4"
                    className="heart"
                    onClick={toggleHearts}
                    src={isNoted.heart4 ? icons.fullHeart : icons.emptyHeart}
                    alt="noter 4/5"
                    title="noter 4/5"
                  />
                  <img
                    id="heart5"
                    className="heart"
                    onClick={toggleHearts}
                    src={isNoted.heart5 ? icons.fullHeart : icons.emptyHeart}
                    alt="noter 5/5"
                    title="noter 5/5"
                  />
                </div>
                <button
                  className={
                    hasVoted ? "doneButton" : "creationIngredientsButton"
                  }
                  onClick={addNote}
                >
                  {hasVoted ? "Noté" : "Noter"}
                </button>
              </div>
            </>
          )}
      </div>
      <div className="commentsContainer">
        {localStorage.getItem("username")
          ? <h1 className="commentsTitle">Commentaires</h1>
          : <div className="login" onClick={() => navigate("/profil")} title="Se connecter">
            Se connecter
          </div>}
        { // Add opinion only if logged
          localStorage.getItem("username") && (
            <div className="opinion">
              <div className="addComment">
                <input
                  type="text"
                  placeholder="Restez courtois :)"
                  onChange={handleComment}
                  onKeyDown={handlePressEnter}
                  className="userCommentTextArea"
                />
                <button
                  onClick={addComment}
                  className="myprofileModifyButton"
                  title="Commenter"
                >
                  Commenter
                </button>
              </div>
            </div>
          )
        }
        <div
          className={`${comments.length > 6 ? "comments" : "commentsWithoutContainer"
            }`}
        >
          {comments.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                recipeAuthor={recipe.author}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};
