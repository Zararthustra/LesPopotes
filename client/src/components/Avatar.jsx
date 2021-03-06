import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const Avatar = ({ chosenAvatar, defaultAvatar }) => {
  //________________________________________ Variables
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(
    defaultAvatar
      ? defaultAvatar
      : `https://avatars.dicebear.com/api/big-smile/${Math.floor(
        Math.random() * 999
      )}.svg?translateY=10`
  );

  //________________________________________ Functions
  const getAvatar = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);

    const randomPath = `avatars.dicebear.com/api/big-smile/${Math.random() * 99999
      }.svg?translateY=10`;


    setAvatar(
      `https://${randomPath}`
    );
    chosenAvatar(
      `https://${randomPath}`
    );
  };

  //________________________________________ Render
  return loading ? (
    <ClipLoader css={""} color={"#00be7c"} loading={loading} size={50} />
  ) : (
    <img onClick={getAvatar} src={avatar} title="Changer d'avatar" alt="avatar" className="avatar" />
  );
};

//    Options
// const hair = [
//   "shortHair",
//   "mohawk",
//   "wavyBob",
//   "bowlCutHair",
//   "curlyBob",
//   "straightHair",
//   "braids",
//   "shavedHead",
//   "bunHair",
//   "froBun",
//   "bangs",
//   "halfShavedHead",
//   "curlyShortHair",
// ];
// const mouth = [
//   "openedSmile",
//   "unimpressed",
//   "gapSmile",
//   "openSad",
//   "teethSmile",
//   "awkwardSmile",
//   "braces",
//   "kawaii",
// ];
// const eyes = [
//   "cheery",
//   "normal",
//   "confused",
//   "starstruck",
//   "winking",
//   "sleepy",
//   "sad",
//   "angry",
// ];
// const accessories = [
//   "catEars",
//   "glasses",
//   "sailormoonCrown",
//   "clownNose",
//   "sleepMask",
//   "sunglasses",
//   "faceMask",
//   "mustache",
// ];
// const skinColor = [
//   "variant01",
//   "variant02",
//   "variant03",
//   "variant04",
//   "variant05",
//   "variant06",
//   "variant07",
//   "variant08",
// ];
// const hairColor = [
//   "variant01",
//   "variant02",
//   "variant03",
//   "variant04",
//   "variant05",
//   "variant06",
//   "variant07",
//   "variant08",
// ];

// getAvatar
// const basePath = "avatars.dicebear.com/api/big-smile/seed.svg";
// const h = hair[Math.floor(Math.random() * hair.length)];
// const m = mouth[Math.floor(Math.random() * mouth.length)];
// const e = eyes[Math.floor(Math.random() * eyes.length)];
// const a = accessories[Math.floor(Math.random() * accessories.length)];
// const s = skinColor[Math.floor(Math.random() * skinColor.length)];
// const hc = hairColor[Math.floor(Math.random() * hairColor.length)];

//`https://${basePath}?hair=${h}&mouth=${m}&eyes=${e}&accessories=${a}&skinColor=${s}&hairColor=${hc}&translateY=10`