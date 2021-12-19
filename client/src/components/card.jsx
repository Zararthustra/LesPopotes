import { useNavigate } from "react-router-dom";

export const Card = ({ icons, images, name }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/lapopote/${name}`);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
      className="card"
    >
      <img className="cardImg" src={images.image3} alt="" />
      <div className="cardInfos">
        <h3 className="cardTitle">Muesli fraise aux graines</h3>
        <div className="separateLine"></div>
        <ul className="cardIcons">
          <li className="cardInfo">
            <img className="difficultyImg" src={icons.diff1} alt="" />
            Facile
          </li>
          <li className="cardInfo">
            <img className="likeImg" src={icons.like45} alt="" />5 avis
          </li>
          <li className="cardInfo">
            <img className="timeImg" src={icons.time} alt="" />
            25 min
          </li>
        </ul>
      </div>
    </div>
  );
};
