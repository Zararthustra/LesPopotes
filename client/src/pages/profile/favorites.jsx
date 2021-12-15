import { Card } from "../../components/card";
import { icons } from "../../assets/images/importIcons";
import { images } from "../../assets/images/importImages";

export const Favorites = () => {
  return (
    <div className="mapopoteBody">
      <div>
        <h1>Liste de mes recettes favorites</h1>
        <Card icons={icons} images={images} />
      </div>
    </div>
  );
};
