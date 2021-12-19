import { Card } from "../../components/card";
import { icons } from "../../assets/images/importIcons";
import { images } from "../../assets/images/importImages";
import { SearchFilterPopote } from "../../components/searchFilterPopote";

export const Mesrecettes = () => {
  return (
    <div className="mapopoteBody">
      <SearchFilterPopote />
      <div>
        <h1>Liste de mes recettes créées</h1>
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
