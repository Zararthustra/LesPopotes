import Select from "react-select";
import { capitalize } from "../assets/utils/capitalize";

export const RecipeInfosModification = ({ sharedVars }) => {
  //___________________________________________________ Variables

  const setDiff = sharedVars.setDiff;
  const setNbPers = sharedVars.setNbPers;
  const setTags = sharedVars.setTags;
  const setType = sharedVars.setType;
  const setBakeMode = sharedVars.setBakeMode;
  const setPrepTime = sharedVars.setPrepTime;
  const setBakeTime = sharedVars.setBakeTime;
  const tags = sharedVars.tags;

  const selectStyle = {
    singleValue: (base, state) => ({
      ...base,
      color: "var(--dark-popote)",
    }),
    control: (base, state) => ({
      ...base,
      cursor: "pointer",
      minWidth: "12em",
      border: state.isFocused ? "1px var(--popote) solid" : "1px black solid",
      boxShadow: "none",
      "&:hover": {
        border: "1px var(--popote) solid",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "var(--dark-popote)" : "white",
      fontSize: "0.9em",
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
  const getTags = () => {
    return tags.map((tag) => {
      return { label: "#" + tag, value: tag };
    });
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
    <div className="recipeCreationInfos">
      <h3 className="creationTitles Infos">Informations</h3>
      <div className="infosSelects">
        <Select
          defaultValue={getTags}
          isSearchable={false}
          placeholder="#Tags"
          isMulti
          styles={selectStyle}
          className="selectTag"
          onChange={handleTags}
          options={[
            { value: "recetteDeGrandMère", label: "#recetteDeGrandMère" },
            { value: "etudiant", label: "#etudiant" },
            { value: "spectaculaire", label: "#spectaculaire" },
            { value: "rapido", label: "#rapido" },
            { value: "sanscouverts", label: "#sanscouverts" },
            { value: "romantique", label: "#romantique" },
            { value: "régional", label: "#régional" },
          ]}
        />
        <Select
          defaultValue={{
            value: sharedVars.type,
            label: capitalize(sharedVars.type),
          }}
          isSearchable={false}
          placeholder="Type"
          styles={selectStyle}
          onChange={handleType}
          options={[
            { value: "apero", label: "Apéro" },
            { value: "entree", label: "Entrée" },
            { value: "plat", label: "Plat" },
            { value: "dessert", label: "Dessert" },
            { value: "autre", label: "Autre" },
          ]}
        />
        <Select
          defaultValue={{
            value: sharedVars.nbPers,
            label: `${sharedVars.nbPers} pers`,
          }}
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
        <Select
          defaultValue={{
            value: sharedVars.diff,
            label:
              sharedVars.diff === "1"
                ? "Facile"
                : sharedVars.diff === "2"
                ? "Moyen"
                : "Difficile",
          }}
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
        <Select
        defaultValue={{
          value: sharedVars.bakeMode,
          label: capitalize(sharedVars.bakeMode),
        }}
          isSearchable={false}
          placeholder="Mode de cuisson"
          styles={selectStyle}
          className="bakeMode"
          onChange={handleBakeMode}
          options={[
            { value: "four", label: "Four" },
            { value: "cookeo", label: "Cookeo" },
            { value: "thermomix", label: "Thermomix" },
            { value: "poele", label: "Poele" },
          ]}
        />
      </div>
      <div className="times">
        <div className="time">
          <div className="lighttext">Préparation</div>
          <div>
            <input
            value={sharedVars.prepTime}
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
            value={sharedVars.bakeTime}
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
