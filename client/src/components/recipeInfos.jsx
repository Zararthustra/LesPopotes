import { capitalize } from "../assets/utils/capitalize";
import { icons } from "../assets/utils/importIcons";
import { images } from "../assets/utils/importImages";

export const RecipeInfos = ({ infos }) => {

  //const heartNote = Pick hearts from likes
  //const diffNote = Pick diff from diff

  return (
    <div className="recipeInfos">
      <ul className="diffnote">
        <li className="cardInfo">
          <img className="nbpersImg" src={images.nbpers} alt="" />
          {infos.nbPers} pers
        </li>
        <li className="cardInfo">
          <img className="difficultyImg" src={icons.diff1} alt="" />
          {infos.difficulty && capitalize(infos.difficulty)}
        </li>
        <li className="cardInfo">
          <img className="likeImg" src={icons.like45} alt="" />
          {infos.notes} avis
        </li>
      </ul>
      <div className="tags">
        {infos.tag//s.map((tag, index) => {
        //   return <div key={index} className="tag">
        //     #{tag}
        //   </div>;
        // })
        }
      </div>
      <div className="times">
        <div className="time">
          <div className="lighttext">Préparation</div>
          <div className="value">{infos.prepTime} min</div>
        </div>
        <div className="time">
          <div className="lighttext">Cuisson</div>
          <div className="value">{infos.bakeType && capitalize(infos.bakeType)}</div>
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
  );
};
