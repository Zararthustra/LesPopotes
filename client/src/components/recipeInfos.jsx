import { capitalize } from "../assets/utils/capitalize";
import { icons } from "../assets/utils/importIcons";
import { images } from "../assets/utils/importImages";

export const RecipeInfos = ({ infos, note }) => {
  const diff =
    infos.difficulty === "3"
      ? "Difficile"
      : infos.difficulty === "2"
      ? "Moyen"
      : "Facile";
  const diffIcon =
    infos.difficulty === "3"
      ? icons.diff3
      : infos.difficulty === "2"
      ? icons.diff2
      : icons.diff1;

  const noteIcon = () => {
    if (note.value === 0) return icons.like0;
    if (0 < note.value && note.value <= 0.5) return icons.like05;
    if (0.5 < note.value && note.value <= 1) return icons.like1;
    if (1 < note.value && note.value <= 1.5) return icons.like15;
    if (1.5 < note.value && note.value <= 2) return icons.like2;
    if (2 < note.value && note.value <= 2.5) return icons.like25;
    if (2.5 < note.value && note.value <= 3) return icons.like3;
    if (3 < note.value && note.value <= 3.5) return icons.like35;
    if (3.5 < note.value && note.value <= 4) return icons.like4;
    if (4 < note.value && note.value <= 4.5) return icons.like45;
    if (note.value > 4.5) return icons.like5;
  };

  return (
    <div className="allInfos">
      <div className="tags">
        {infos.tags ? (
          infos.tags.includes(",") ? (
            infos.tags.split(",").map((tag, index) => {
              return (
                <div key={index} className="tag">
                  #{tag}
                </div>
              );
            })
          ) : (
            <div className="tag">#{infos.tags}</div>
          )
        ) : (
          ""
        )}
      </div>
      <div className="recipeInfos">
        <ul className="diffnote">
          <li className="cardInfo">
            <img
              className="nbpersImg"
              src={images.nbpers}
              alt="nombre de personnes"
            />
            {infos.nbPers} pers
          </li>
          <li className="cardInfo">
            <img className="difficultyImg" src={diffIcon} alt="difficulté" />
            {diff}
          </li>
          <li className="cardInfo">
            <img className="likeImg" src={noteIcon()} alt="note moyenne avis" />
            {note.votes} avis
          </li>
        </ul>
        <div className="times">
          <div className="time">
            <div className="lighttext">Préparation</div>
            <div className="value">{infos.prepTime} min</div>
          </div>
          <div className="time">
            <div className="lighttext">Cuisson</div>
            <div className="value">
              {infos.bakeType && capitalize(infos.bakeType)}
            </div>
            <div className="value">{infos.bakeTime} min</div>
          </div>
          <div className="time">
            <div>
              <strong>Total</strong>
            </div>
            <div className="valuedark">
              {infos.prepTime + infos.bakeTime} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
