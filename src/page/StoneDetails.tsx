import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

// Type
import { stoneDetailsSchema } from "../Schema/StoneSchema";
type Stone = z.infer<typeof stoneDetailsSchema>;
type Picture = "Éclat" | "Fragment" | "Morceau" | "Pierre";

const StoneDetails = (): JSX.Element => {
  const { id } = useParams();
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stoneData, setStoneData] = useState<Stone | null>(null);
  const [picture, setPicture] = useState<Picture>("Éclat");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(
        //   `http://localhost:3000/stone/details?id=${id}`
        // );
        const { data } = await axios.get(
          `https://site--genshinapi--m8kkvg9l2hpy.code.run/stone/details?id=${id}`
        );
        // console.log(data);

        const stoneDetailsParsed = stoneDetailsSchema.parse(data);
        // console.log(stoneDetailsParsed);

        setStoneData(stoneDetailsParsed);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(new Error("Erreur de validation Zod"));
        } else {
          setError(new Error("An error occured !!!"));
        }
      }
    };
    fetchData();
  }, []);

  if (error)
    return (
      <div className="container">
        <div className="error">Error: {error.message}</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="container">
        <div className="loading">
          <HashLoader size={150} color="#6890f0" />
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="stone">
        <div
          className={
            theme === "night" ? "stoneDescriptionNight" : "stoneDescriptionDay"
          }
        >
          <h2>{stoneData?.name}</h2>
          <div>
            <p
              onClick={() => {
                setPicture("Éclat");
              }}
              className={
                picture === "Éclat"
                  ? theme === "night"
                    ? "stonePictureChoiceNight"
                    : "stonePictureChoiceDay"
                  : ""
              }
            >
              Éclat
            </p>
            <p
              onClick={() => {
                setPicture("Fragment");
              }}
              className={
                picture === "Fragment"
                  ? theme === "night"
                    ? "stonePictureChoiceNight"
                    : "stonePictureChoiceDay"
                  : ""
              }
            >
              Fragment
            </p>
            <p
              onClick={() => {
                setPicture("Morceau");
              }}
              className={
                picture === "Morceau"
                  ? theme === "night"
                    ? "stonePictureChoiceNight"
                    : "stonePictureChoiceDay"
                  : ""
              }
            >
              Morceau
            </p>
            <p
              onClick={() => {
                setPicture("Pierre");
              }}
              className={
                picture === "Pierre"
                  ? theme === "night"
                    ? "stonePictureChoiceNight"
                    : "stonePictureChoiceDay"
                  : ""
              }
            >
              Pierre
            </p>
          </div>

          <div
            className={
              theme === "night" ? "pictureStoneNight" : "pictureStoneDay"
            }
          >
            {picture === "Éclat" && (
              <img src={stoneData?.stone[0].icon} alt="picture éclat" />
            )}
            {picture === "Fragment" && (
              <img src={stoneData?.stone[1].icon} alt="picture fragment" />
            )}
            {picture === "Morceau" && (
              <img src={stoneData?.stone[2].icon} alt="picture morceau" />
            )}
            {picture === "Pierre" && (
              <img src={stoneData?.stone[3].icon} alt="picture pierre" />
            )}
          </div>

          <div>
            <p>Élément</p>
            <img src={stoneData?.icon} alt="élément" />
          </div>

          <div>
            <p>Type</p>
            <p>Matériau d'élévation de personnage</p>
          </div>

          <div className="stoneDetails">
            <p className={theme === "light" ? "titleBackgroundBlue" : ""}>
              Description
            </p>
            <div>
              {stoneData?.description.map((description) => {
                return <div key={description.text}>{description.text}</div>;
              })}
            </div>
          </div>

          <div className="stoneDetails">
            <p className={theme === "light" ? "titleBackgroundBlue" : ""}>
              Obtention
            </p>
            <div>
              {stoneData?.obtainment.map((obtainment) => {
                return (
                  <div key={obtainment.text}>
                    <p>⏺</p> <p>{obtainment.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={theme === "night" ? "stoneLootNight" : "stoneLootDay"}>
          <div>
            <h3>Obtention des {stoneData?.name}</h3>

            <div
              className={theme === "night" ? "stoneBossNight" : "stoneBossDay"}
            >
              <p>Boss hebdomadaires</p>
              <div>
                {stoneData?.weeklyBoss?.map((weeklyBoss) => {
                  return (
                    <div
                      key={weeklyBoss.id}
                      className="stoneIconBoss"
                      onClick={() => {
                        navigate("/WeeklyBoss/Details/" + weeklyBoss.id);
                      }}
                    >
                      <img src={weeklyBoss.icon} alt="icon boss" />
                      <p>{weeklyBoss.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={theme === "night" ? "stoneBossNight" : "stoneBossDay"}
            >
              <p>Boss de monde</p>
              <div>
                {stoneData?.normalBoss?.map((normalBoss) => {
                  return (
                    <div
                      key={normalBoss.id}
                      className="stoneIconBoss"
                      onClick={() => {
                        navigate("/NormalBoss/Details/" + normalBoss.id);
                      }}
                    >
                      <img src={normalBoss.icon} alt="icon boss" />
                      <p>{normalBoss.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="stoneCharacter">
            <h3>Ascension de personnages</h3>
            <div>
              {stoneData?.character.map((character) => {
                return (
                  <div
                    key={character.id}
                    onClick={() => {
                      navigate("/Characters/Details/" + character.id);
                    }}
                  >
                    <img src={character.icon} alt="icon personnage" />
                    <p>{character.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoneDetails;
