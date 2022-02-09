import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../assets/utils/capitalize";
import { Host } from "../assets/utils/host";
import { icons } from "../assets/utils/importIcons";

export const Card = ({ recipe }) => {
  const navigate = useNavigate();
  const [note, setNote] = useState([]);
  const [votes, setVotes] = useState();

  

  // Load data when mounting
  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await axios.get(`${Host}api/notes/${recipe.id}`, {
          params: { userId: localStorage.getItem("userid") },
        });
  
        let notes = [];
        let average = 0;
        let total = 0;
  
        if (res.data.noteArray) {
          notes = res.data.noteArray;
          setVotes(notes.length);
  
          if (notes.length > 1) {
            for (let i = 0; i < notes.length; i++) {
              total += notes[i].note;
            }
            average = total / notes.length;
          } else if (notes.length === 1) average = res.data.noteArray[0].note;
  
          setNote(average);
        }
      } catch (error) {
        console.log("An error occured while requesting notes:\n", error);
      }
    };

    getNote();
    return () => setNote();
  }, [recipe.id]);

  const noteIcon = () => {
    if (note === 0) return icons.like0;
    if (0 < note && note <= 0.5) return icons.like05;
    if (0.5 < note && note <= 1) return icons.like1;
    if (1 < note && note <= 1.5) return icons.like15;
    if (1.5 < note && note <= 2) return icons.like2;
    if (2 < note && note <= 2.5) return icons.like25;
    if (2.5 < note && note <= 3) return icons.like3;
    if (3 < note && note <= 3.5) return icons.like35;
    if (3.5 < note && note <= 4) return icons.like4;
    if (4 < note && note <= 4.5) return icons.like45;
    if (note > 4.5) return icons.like5;
  };

  const diff =
    recipe.difficulty === "3"
      ? "Difficile"
      : recipe.difficulty === "2"
      ? "Moyen"
      : "Facile";

  const image = () => {
    if (recipe.image === "no image yet" || !recipe.image)
      return require("../assets/icons/delete-512.png").default; //default image
    return require(`../Images/${recipe.image?.split("\\")[4]}`).default;
  };

  const diffIcon =
    recipe.difficulty === "3"
      ? icons.diff3
      : recipe.difficulty === "2"
      ? icons.diff2
      : icons.diff1;

  return (
    <div
      onClick={() => {
        navigate(`/lapopote/${recipe.id}`);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
      className="card"
    >
      <img className="cardImg" src={image()} alt={recipe.name} />
      <div className="cardInfos">
        <h3 className="cardTitle">{recipe.name && capitalize(recipe.name)}</h3>
        <div className="separateLine"></div>
        <ul className="cardIcons">
          <li className="cardInfo">
            <img className="difficultyImg" src={diffIcon} alt="Difficulté" />
            {diff}
          </li>
          <li className="cardInfo">
            <img className="likeImg" src={noteIcon()} alt="Moyenne des avis" />
            {votes} avis
          </li>
          <li className="cardInfo">
            <img
              className="timeImg"
              src={icons.time}
              alt="Temps total de préparation"
            />
            {recipe.prepTime + recipe.bakeTime} min
          </li>
        </ul>
      </div>
    </div>
  );
};
