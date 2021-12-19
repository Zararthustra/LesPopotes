import { icons } from "../assets/images/importIcons";
import { images } from "../assets/images/importImages";
export const RecipeInfos = () => {
  return (
    <div className="recipeInfos">
      <ul className="diffnote">
        <li className="cardInfo">
          <img className="nbpersImg" src={images.nbpers} alt="" />4 pers
        </li>
        <li className="cardInfo">
          <img className="difficultyImg" src={icons.diff1} alt="" />
          Facile
        </li>
        <li className="cardInfo">
          <img className="likeImg" src={icons.like45} alt="" />5 avis
        </li>
      </ul>
      <div className="times">
        <div className="time">
          <div>
            <strong>Total</strong>
          </div>
          <div className="valuedark">40 min</div>
        </div>
        <div className="time">
          <div className="lighttext">Préparation</div>
          <div className="value">20 min</div>
        </div>
        <div className="time">
          <div className="lighttext">Cuisson</div>
          <div className="value">Four</div>
          <div className="value">20 min</div>
        </div>
      </div>
    </div>
  );
};
