import { Card } from "../../components/card";
import { icons } from "../../assets/images/importIcons";
import { images } from "../../assets/images/importImages";
import { SearchFilterPopote } from "../../components/searchFilterPopote";

export const Favorites = () => {
  return (
    <div className="mapopoteBody">
      <SearchFilterPopote />
      <div>
        <h1>Liste de mes recettes favorites</h1>
        <div className="cardList">
          <Card icons={icons} images={images} />
          <Card icons={icons} images={images} />
          <Card icons={icons} images={images} />
          <Card icons={icons} images={images} />
          <Card icons={icons} images={images} />
        </div>
      </div>
    </div>
  );
};
