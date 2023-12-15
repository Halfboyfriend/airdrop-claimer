import level1A from "../assets/images/group/Variant1.jpg";
import level1B from "../assets/images/group/Variant2.jpg";
import level1C from "../assets/images/group/Variant3.jpg";
import level1D from "../assets/images/group/Variant4.jpg";
import level1E from "../assets/images/group/Variant5.jpg";
import level1F from "../assets/images/group/Variant6.jpg";
import level1G from "../assets/images/group/Variant7.jpg";
import level1H from "../assets/images/group/Variant8.jpg";
import level1I from "../assets/images/group/Variant9.jpg";
import level1J from "../assets/images/group/Variant10.jpg";
import level1K from "../assets/images/group/Variant11.jpg";
import { chakraToDollars } from "./formatter";

const levelThresholds = [
  { threshold: 0, image: level1A },
  { threshold: 20, image: level1B },
  { threshold: 30, image: level1C },
  { threshold: 40, image: level1D },
  { threshold: 50, image: level1E },
  { threshold: 60, image: level1F },
  { threshold: 70, image: level1G },
  { threshold: 80, image: level1H },
  { threshold: 90, image: level1I },
  { threshold: 100, image: level1J },
  { threshold: 120, image: level1K },

  { threshold:150, image: level1A },
  { threshold: 200, image: level1B },
  { threshold: 250, image: level1C },
  { threshold: 340, image: level1D },
  { threshold: 500, image: level1E },
  { threshold: 660, image: level1F },
  { threshold: 740, image: level1G },
  { threshold: 970, image: level1H },
  { threshold: 1800, image: level1I },
  { threshold: 2900, image: level1J },
  { threshold: 3000, image: level1K },

];

export function Levels() {
  const userEarning = localStorage.getItem("userearning");

  const findCurrentLevel = () => {
    const dollars = chakraToDollars(userEarning).toFixed(2);
    let currentLevel = null;

    for (let i = levelThresholds.length - 1; i >= 0; i--) {
      const { threshold, image } = levelThresholds[i];

      if (Number(dollars) > threshold) {
        currentLevel = image;
        break;
      }
    }

    return currentLevel;
  };

  const renderCurrentLevel = () => {
    const currentLevelImage = findCurrentLevel();

    return (
      currentLevelImage && (
        <img
          src={currentLevelImage}
          alt="current-level"
          className="img-fluid"
        />
      )
    );
  };
  return (
    <>
      <div className="level__logo">
        <div>{userEarning && renderCurrentLevel()}</div>
      </div>
    </>
  );
}
