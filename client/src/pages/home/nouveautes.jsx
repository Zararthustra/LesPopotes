import { Card } from "../../components/card";
import { icons } from "../../assets/images/importIcons";
import { images } from "../../assets/images/importImages";

export const Lastpubs = () => {
  return (
    <div>
      <h1>Dernières publications</h1>
      <div className="cardList">
      <Card icons={icons} images={images} />
      <Card icons={icons} images={images} />
      <Card icons={icons} images={images} />
      <Card icons={icons} images={images} />
      <Card icons={icons} images={images} />
    </div>
    </div>
  );
};
