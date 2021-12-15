import { useState } from "react";

export const Avatar = () => {
  // Variables

  //    Avatar
  const hair = [
    "shortHair",
    "mohawk",
    "wavyBob",
    "bowlCutHair",
    "curlyBob",
    "straightHair",
    "braids",
    "shavedHead",
    "bunHair",
    "froBun",
    "bangs",
    "halfShavedHead",
    "curlyShortHair",
  ];
  const mouth = [
    "openedSmile",
    "unimpressed",
    "gapSmile",
    "openSad",
    "teethSmile",
    "awkwardSmile",
    "braces",
    "kawaii",
  ];
  const eyes = [
    "cheery",
    "normal",
    "confused",
    "starstruck",
    "winking",
    "sleepy",
    "sad",
    "angry",
  ];
  const accessories = [
    "catEars",
    "glasses",
    "sailormoonCrown",
    "clownNose",
    "sleepMask",
    "sunglasses",
    "faceMask",
    "mustache",
  ];
  const skinColor = [
    "variant01",
    "variant02",
    "variant03",
    "variant04",
    "variant05",
    "variant06",
    "variant07",
    "variant08",
  ];
  const hairColor = [
    "variant01",
    "variant02",
    "variant03",
    "variant04",
    "variant05",
    "variant06",
    "variant07",
    "variant08",
  ];
  const [avatar, setAvatar] = useState(
    "https://avatars.dicebear.com/api/big-smile/sdfq.svg"
  );

  const getAvatar = () => {
    const basePath = "avatars.dicebear.com/api/big-smile/seed.svg";
    const h = hair[Math.floor(Math.random() * hair.length)];
    const m = mouth[Math.floor(Math.random() * mouth.length)];
    const e = eyes[Math.floor(Math.random() * eyes.length)];
    const a = accessories[Math.floor(Math.random() * accessories.length)];
    const s = skinColor[Math.floor(Math.random() * skinColor.length)];
    const hc = hairColor[Math.floor(Math.random() * hairColor.length)];

    setAvatar(
      `https://${basePath}?hair=${h}&mouth=${m}&eyes=${e}&accessories=${a}&skinColor=${s}&hairColor=${hc}&translateY=-20`
    );
  };

  return (
    <img onClick={getAvatar} src={avatar} alt="avatar" className="avatar" />
  );
};
