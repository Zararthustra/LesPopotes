import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize } from "../../assets/utils/capitalize";
import { Host } from "../../assets/utils/host";
import { Comment } from "../../components/comment";
import { RecipeInfos } from "../../components/recipeInfos";
import { RecipeIngredients } from "../../components/recipeIngredients";
import { icons } from "../../assets/utils/importIcons";
import { refreshPage } from "../../assets/utils/refreshPage";
import ClipLoader from "react-spinners/ClipLoader";

export const Recette = () => {
  //___________________________________________________ Variables

  const navigate = useNavigate();
  const { recetteID } = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNoted, setIsNoted] = useState({});
  const [recipeNote, setRecipeNote] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [userNote, setUserNote] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const getComments = async (tmpArray) => {
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

    // Get Notes (first get comments (DB) to setComments (local) to add notes, calculate recipeNote average and set user's vote if already voted)
    const getNotes = async () => {
      await getComments();

      const res = await axios.get(`${Host}api/notes/${recetteID}`, {
        params: { userId: localStorage.getItem("userid") },
      });

      let notes = [];
      let average = 0;
      let total = 0;

      if (res.data) {
        notes = res.data.noteArray;

        if (notes.length > 1) {
          for (let i = 0; i < notes.length; i++) {
            total += notes[i].note;
          }
          average = total / notes.length;
        } else if (notes.length === 1) average = res.data.noteArray[0].note;

        if (res.data.usersNote) {
          setUserNote(res.data.usersNote);
          setIsNoted(getUsersNote(res.data.usersNote));
        }

        const addNotesToCommentsObject = TMPComments.map((comment) => {
          const getUserNote = notes.filter((note) => {
            if (note.user_id === comment.user_id) return note.note;
            return null;
          });
          return { ...comment, note: getUserNote[0]?.note };
        });
        setComments(addNotesToCommentsObject);
        setRecipeNote({ value: average, votes: notes.length });
        setLoading(false);
      }
    };
    if (isSubscribed) getNotes();

    return () => (isSubscribed = false);
  }, [recetteID]);

  //___________________________________________________ Functions

  const image = () => {
    if (recipe.image === "no image yet" || !recipe.image)
      return require("../../assets/icons/delete-512.png").default; //default image
    return require(`../../Images/${recipe.image?.split("\\")[4]}`).default;
  };

  // Favorite
  const addToFavorites = () => {
    axios
      .post(`${Host}api/favorites`, {
        recipe_id: recetteID,
        user_id: localStorage.getItem("userid"),
      })
      .then((res) => {
        if (res.data) setIsFavorite(true);
      });
  };
  const removeFromFavorites = () => {
    axios
      .delete(`${Host}api/favorites/${recetteID}`, {
        params: { userId: localStorage.getItem("userid") },
      })
      .then((res) => {
        if (res.data) setIsFavorite(false);
      });
  };

  // Opinion Note
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

    if (voteButton && note > 0)
      axios
        .post(`${Host}api/notes`, {
          recipe_id: recetteID,
          user_id: localStorage.getItem("userid"),
          value: note,
        })
        .then((res) => {
          if (res.status === 200) {
            setHasVoted(true);
            voteButton.remove("creationIngredientsButton");
            voteButton.add("doneButton");
          }
        });
  };

  // Opinion Comment
  const handleComment = (event) => {
    setComment(event.currentTarget.value);
  };
  const addComment = () => {
    if (comment)
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
          if (res.status === 201) {
            refreshPage();
          }
        });
  };

  //___________________________________________________ Render
  if (loading)
    return (
      <main>
        <div className="loaderSpacer" />
        <ClipLoader css={""} color={"#f5a76c"} loading={loading} size={100} />
      </main>
    );
  return (
    <main className="recipePage">
      <div className="recipeContainer">
        <div className="imgContainer">
          <img className="recipeImg" src={image()} alt={recipe.name} />

          <div className="overlayImage">
            {isFavorite ? (
              <img
                src={require("../../assets/icons/star-checked.png").default}
                className="starChecked"
                onClick={removeFromFavorites}
                alt="retirer des recettes favorites"
              />
            ) : (
              <img
                onClick={addToFavorites}
                src={require("../../assets/icons/star.png").default}
                className="star"
                alt="ajouter aux recettes favorites"
              />
            )}
            <img
              src={require("../../assets/icons/close.png").default}
              className="closeRecipe"
              onClick={() => navigate(-1)}
              alt="fermer"
            />
          </div>
        </div>

        <div className="recipeTitle">
          {recipe.name && capitalize(recipe.name)}
        </div>
        <div className="separatePopote"></div>
        <div
          className="doneBy"
          onClick={() => navigate(`/lespopotes/${recipe.author}`)}
        >
          {recipe.author && capitalize(recipe.author)}
        </div>
        <RecipeInfos infos={recipe} note={recipeNote} />
        <div className="separatePopote"></div>
        <RecipeIngredients ingredients={ingredients} />
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
      </div>
      <div className="commentsContainer">
        <h1 className="commentsTitle">Commentaires</h1>
        {
          // Add opinion only if logged
          localStorage.getItem("username") && (
            <div className="opinion">
              {capitalize(localStorage.getItem("username")) ===
              (recipe.author && capitalize(recipe.author)) ? (
                ""
              ) : (
                <div className="addNote">
                  <div className="hearts">
                    <img
                      id="heart1"
                      className="heart"
                      onClick={toggleHearts}
                      src={isNoted.heart1 ? icons.fullHeart : icons.emptyHeart}
                      alt="noter 1/5"
                    />
                    <img
                      id="heart2"
                      className="heart"
                      onClick={toggleHearts}
                      src={isNoted.heart2 ? icons.fullHeart : icons.emptyHeart}
                      alt="noter 2/5"
                    />
                    <img
                      id="heart3"
                      className="heart"
                      onClick={toggleHearts}
                      src={isNoted.heart3 ? icons.fullHeart : icons.emptyHeart}
                      alt="noter 3/5"
                    />
                    <img
                      id="heart4"
                      className="heart"
                      onClick={toggleHearts}
                      src={isNoted.heart4 ? icons.fullHeart : icons.emptyHeart}
                      alt="noter 4/5"
                    />
                    <img
                      id="heart5"
                      className="heart"
                      onClick={toggleHearts}
                      src={isNoted.heart5 ? icons.fullHeart : icons.emptyHeart}
                      alt="noter 5/5"
                    />
                  </div>
                  <button
                    className="creationIngredientsButton"
                    onClick={addNote}
                  >
                    {hasVoted ? "Noté" : userNote > 0 ? "Renoter" : "Noter"}
                  </button>
                </div>
              )}
              <div className="addComment">
                <textarea
                  type="text"
                  onChange={handleComment}
                  className="userCommentTextArea"
                />
                <button onClick={addComment} className="myprofileModifyButton">
                  Commenter
                </button>
              </div>
            </div>
          )
        }
        <div className="comments">
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
