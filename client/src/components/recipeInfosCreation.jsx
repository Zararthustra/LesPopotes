import { icons } from "../assets/utils/importIcons";
import { images } from "../assets/utils/importImages";
import Select from "react-select";
import { useState } from "react";

export const RecipeInfosCreation = ({ infos, sharedVars }) => {
  //___________________________________________________ Variables
  const [diffImage, setDiffImage] = useState(icons.diff1);

  const setDiff = sharedVars.setDiff;
  const setNbPers = sharedVars.setNbPers;
  const setTags = sharedVars.setTags;
  const setType = sharedVars.setType;
  const setBakeMode = sharedVars.setBakeMode;
  const setPrepTime = sharedVars.setPrepTime;
  const setBakeTime = sharedVars.setBakeTime;

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      fontSize: "0.8em",
      cursor: "pointer",
      minWidth: "8em",
      border: state.isFocused ? "2px var(--popote) solid" : "1px black solid",
      boxShadow: "none",
      "&:hover": {
        border: "2px var(--popote) solid",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "var(--dark-popote)" : "white",
      color: state.isFocused ? "white" : "var(--dark-popote)",
      "&:hover": {
        backgroundColor: "var(--dark-popote)",
        color: "white",
      },
    }),
  };

  //___________________________________________________ Functions

  const handleDiff = (event) => {
    setDiff(event.value);
    event.value === "3"
      ? setDiffImage(icons.diff3)
      : event.value === "2"
      ? setDiffImage(icons.diff2)
      : setDiffImage(icons.diff1);
  };

  const handlePers = (event) => {
    setNbPers(event.value);
  };

  const handleType = (event) => {
    setType(event.value);
  };

  const handleTags = (event) => {
    let newArr = [];
    event.map((e) => {
      return newArr.push(e.value);
    });
    setTags(newArr);
  };

  const handleBakeMode = (event) => {
    setBakeMode(event.value);
  };

  const handleCookTime = (event) => {
    const className = event.currentTarget.className;
    const value = parseInt(event.currentTarget.value);

    if (className === "minutesInput prepTime") {
      if (value < 0 || isNaN(value)) return setPrepTime(0);
      setPrepTime(value);
    }
    if (className === "minutesInput bakeTime") {
      if (value < 0 || isNaN(value)) return setBakeTime(0);
      setBakeTime(value);
    }
  };

  //___________________________________________________ Render

  return (
    <div className="recipeInfos">
      <h3 className="creationTitles Infos">Informations</h3>
      <Select
              isSearchable={false}
              placeholder="Type"
              styles={selectStyle}
              className=""
              onChange={handleType}
              options={[
                { value: "apero", label: "Apéro" },
                { value: "entree", label: "Entrée" },
                { value: "plat", label: "Plat" },
                { value: "dessert", label: "Dessert" },
                { value: "autre", label: "Autre" },
              ]}
            />
      <div className="tags">
        <Select
          isSearchable={false}
          placeholder="#Tags"
          isMulti
          styles={selectStyle}
          className="selectTag"
          onChange={handleTags}
          options={[
            { value: "recettedegrandmère", label: "#recetteDeGrandMère" },
            { value: "etudiant", label: "#etudiant" },
            { value: "spectaculaire", label: "#spectaculaire" },
            { value: "rapido", label: "#rapido" },
          ]}
        />
      </div>
      <ul className="diffnote">
        <li className="cardInfo">
          <img
            className="nbpersImg"
            src={images.nbpers}
            alt="nombre de personnes"
          />
          <Select
            isSearchable={false}
            placeholder="0 pers"
            styles={selectStyle}
            className="selectNbPers"
            onChange={handlePers}
            options={[
              { value: 1, label: "1 pers" },
              { value: 2, label: "2 pers" },
              { value: 3, label: "3 pers" },
              { value: 4, label: "4 pers" },
              { value: 5, label: "5 pers" },
              { value: 6, label: "6 pers" },
              { value: 7, label: "7 pers" },
              { value: 8, label: "8 pers" },
              { value: 9, label: "9 pers" },
              { value: 10, label: "10 pers" },
              { value: 11, label: "11 pers" },
              { value: 12, label: "12 pers" },
            ]}
          />
        </li>
        <li className="cardInfo">
          <img className="difficultyImg" src={diffImage} alt="difficulté" />
          <Select
            isSearchable={false}
            placeholder="Difficulté"
            styles={selectStyle}
            className="selectDiff"
            onChange={handleDiff}
            options={[
              { value: "1", label: "Facile" },
              { value: "2", label: "Moyen" },
              { value: "3", label: "Difficile" },
            ]}
          />
        </li>
      </ul>
      <div className="times">
        <Select
          isSearchable={false}
          placeholder="Mode de cuisson"
          styles={selectStyle}
          className="bakeMode"
          onChange={handleBakeMode}
          options={[
            { value: "four", label: "Four" },
            { value: "cookeo", label: "Cookeo" },
            { value: "thermomix", label: "Thermomix" },
          ]}
        />
        <div className="time">
          <div className="lighttext">Préparation</div>
          <div>
            <input
              type="text"
              pattern="[0-9]*"
              className="minutesInput prepTime"
              placeholder="0"
              min="0"
              onChange={handleCookTime}
            />
            min
          </div>
        </div>
        <div className="time">
          <div className="lighttext">Cuisson</div>
          <div>
            <input
              type="text"
              pattern="[0-9]*"
              className="minutesInput bakeTime"
              placeholder="0"
              min="0"
              onChange={handleCookTime}
            />
            min
          </div>
        </div>
        <div className="time">
          <div>
            <strong>Total</strong>
          </div>
          <div className="valuedark">
            {sharedVars.prepTime + sharedVars.bakeTime} min
          </div>
        </div>
      </div>
    </div>
  );
};
