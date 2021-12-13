export const Card = ({icons, images}) => {
  return (
    <div className="card">
      <img className="cardImg" src={images.image3} alt="" />
      <div className="cardInfos">
        <h3 className="cardTitle">Muesli fraise aux graines</h3>
        <ul className="cardIcons">
          <li className="cardInfo">
            <img className="difficultyImg" src={icons.diff1} alt="" />
            Facile
          </li>
          <li className="cardInfo">
            <img className="likeImg" src={icons.like45} alt="" />
            5 avis
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
