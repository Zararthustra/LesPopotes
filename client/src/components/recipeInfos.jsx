import { icons } from "../assets/images/importIcons";
import { images } from "../assets/images/importImages";
export const RecipeInfos = ({ infos }) => {
  return (
    <div className="recipeInfos">
      <ul className="diffnote">
        <li className="cardInfo">
          <img className="nbpersImg" src={images.nbpers} alt="" />
          {infos.nbPers} pers
        </li>
        <li className="cardInfo">
          <img className="difficultyImg" src={icons.diff1} alt="" />
          {infos.diff}
        </li>
        <li className="cardInfo">
          <img className="likeImg" src={icons.like45} alt="" />
          {infos.nbNote} avis
        </li>
      </ul>
      <div className="tags">
        {infos.tags.map((tag, index) => {
          return <div key={index} className="tag">
            #{tag}
          </div>;
        })}
      </div>
      <div className="times">
        <div className="time">
          <div className="lighttext">Préparation</div>
          <div className="value">{infos.cooking.prep} min</div>
        </div>
        <div className="time">
          <div className="lighttext">Cuisson</div>
          <div className="value">{infos.cooking.bakeType}</div>
          <div className="value">{infos.cooking.bake} min</div>
        </div>
        <div className="time">
          <div>
            <strong>Total</strong>
          </div>
          <div className="valuedark">
            {infos.cooking.prep + infos.cooking.bake} min
          </div>
        </div>
      </div>
    </div>
  );
};
