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
        const { data } = await axios.get(
          `https://site--genshinapi--m8kkvg9l2hpy.code.run/stone/details?id=${id}`
        );
        // console.log(data);

        const stoneDetailsParsed = stoneDetailsSchema.parse(data);
        console.log(stoneDetailsParsed);

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
      {theme === "night" ? (
        <div className="stoneNight">
          <div className="stoneDescriptionNight">
            <h2>{stoneData?.name}</h2>
            <div>
              <p
                onClick={() => {
                  setPicture("Éclat");
                }}
                className={picture === "Éclat" ? "stonePictureChoiceNight" : ""}
              >
                Éclat
              </p>
              <p
                onClick={() => {
                  setPicture("Fragment");
                }}
                className={
                  picture === "Fragment" ? "stonePictureChoiceNight" : ""
                }
              >
                Fragment
              </p>
              <p
                onClick={() => {
                  setPicture("Morceau");
                }}
                className={
                  picture === "Morceau" ? "stonePictureChoiceNight" : ""
                }
              >
                Morceau
              </p>
              <p
                onClick={() => {
                  setPicture("Pierre");
                }}
                className={
                  picture === "Pierre" ? "stonePictureChoiceNight" : ""
                }
              >
                Pierre
              </p>
            </div>

            <div className="pictureStoneNight">
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

            <div className="stoneDetailsNight">
              <p>Description</p>
              <div>
                {stoneData?.description.map((description) => {
                  return <div key={description.text}>{description.text}</div>;
                })}
              </div>
            </div>

            <div className="stoneDetailsNight">
              <p>Obtention</p>
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

          <div className="stoneLootNight">
            <div>
              <h3>Obtention des {stoneData?.name}</h3>

              <div className="stoneBossNight">
                <p>Boss hebdomadaires</p>
                <div>
                  {stoneData?.weeklyBoss?.map((weeklyBoss) => {
                    return (
                      <div
                        key={weeklyBoss.id}
                        className="stoneIconBossNight"
                        // onClick={() => {
                        //   navigate("/WeeklyBoss/Details/" + weeklyBoss.id);
                        // }}
                      >
                        <img src={weeklyBoss.icon} alt="icon boss" />
                        <p>{weeklyBoss.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="stoneBossNight">
                <p>Boss de monde</p>
                <div>
                  {stoneData?.normalBoss?.map((normalBoss) => {
                    return (
                      <div
                        key={normalBoss.id}
                        className="stoneIconBossNight"
                        // onClick={() => {
                        //   navigate("/NormalBoss/Details/" + normalBoss.id);
                        // }}
                      >
                        <img src={normalBoss.icon} alt="icon boss" />
                        <p>{normalBoss.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="stoneCharacterNight">
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
      ) : (
        <div>STONE LIGHT</div>
      )}
    </div>
  );
};

export default StoneDetails;
