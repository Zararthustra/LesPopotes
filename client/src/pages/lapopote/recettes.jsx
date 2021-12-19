import { images } from "../../assets/images/importImages";
import { icons } from "../../assets/images/importIcons";
import { Card } from "../../components/card";
import { useNavigate } from "react-router-dom";
import { SearchFilterPopote } from "../../components/searchFilterPopote";
export const Recettes = () => {
  const navigate = useNavigate();
  return (
    <div className="cardList">
        <SearchFilterPopote />
        <div onClick={() => navigate("Risotto")} className="card">
          <img className="cardImg" src={images.image1} alt="" />
          <div className="cardInfos">
            <h3 className="cardTitle">Risotto</h3>
            <div className="separateLine"></div>
            <ul className="cardIcons">
              <li className="cardInfo">
                <img className="difficultyImg" src={icons.diff3} alt="" />
                Difficile
              </li>
              <li className="cardInfo">
                <img className="likeImg" src={icons.like4} alt="" />
                19 avis
              </li>
              <li className="cardInfo">
                <img className="timeImg" src={icons.time} alt="" />
                40 min
              </li>
            </ul>
          </div>
        </div>

        <div onClick={() => navigate("Tarte")} className="card">
          <img className="cardImg" src={images.image2} alt="" />
          <div className="cardInfos">
            <h3 className="cardTitle">Tarte aux pommes</h3>
            <div className="separateLine"></div>
            <ul className="cardIcons">
              <li className="cardInfo">
                <img className="difficultyImg" src={icons.diff2} alt="" />
                Moyen
              </li>
              <li className="cardInfo">
                <img className="likeImg" src={icons.like25} alt="" />
                13 avis
              </li>
              <li className="cardInfo">
                <img className="timeImg" src={icons.time} alt="" />
                30 min
              </li>
            </ul>
          </div>
        </div>

        <Card icons={icons} images={images} name="Muesli fraise aux céréales" />
        <Card icons={icons} images={images} name="cecec" />
      </div>
  );
};
