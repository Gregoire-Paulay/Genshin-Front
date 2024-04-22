import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

// Type
import { WeeklyBossDetailsSchema } from "../Schema/WeeklyBossSchema";
type WeeklyBoss = z.infer<typeof WeeklyBossDetailsSchema>;
type Picture = "archive" | "fullArt";

const WeeklyBossDetails = () => {
  const { id } = useParams();
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bossDetails, setBossDetails] = useState<WeeklyBoss | null>(null);
  const [picture, setPicture] = useState<Picture>("archive");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        const { data } = await axios.get(
          `http://localhost:3000/boss/weekly/details?id=${id}`
        );
        // console.log(data);

        setBossDetails(data);
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
        <div className="weeklyBossDetailsNight">
          <div className="weeklyBossDescriptionNight">
            <h2>{bossDetails?.name}</h2>
            <h6>{bossDetails?.title}</h6>
            <div>
              <p
                onClick={() => {
                  setPicture("archive");
                }}
                className={
                  picture === "archive"
                    ? "weeklyBossPictureChoiceBorderBottomNight"
                    : "weeklyBossPictureChoiceNight"
                }
              >
                Archive
              </p>
              <p
                onClick={() => {
                  setPicture("fullArt");
                }}
                className={
                  picture === "fullArt"
                    ? "weeklyBossPictureChoiceBorderBottomNight"
                    : "weeklyBossPictureChoiceNight"
                }
              >
                Full Art
              </p>
            </div>
            {picture === "archive" && (
              <img src={bossDetails?.art} alt="artwork boss" />
            )}
            {picture === "fullArt" && (
              <img src={bossDetails?.art2} alt="artwork boss" />
            )}

            <div className="weeklyBossTextNight">
              {bossDetails?.description.map((description, index) => {
                return <div key={index}>{description.text}</div>;
              })}
            </div>

            <div>
              <div className="weeklyBossElementNight">
                <p>Éléments</p>
                <div>
                  {bossDetails?.element.map((element) => {
                    return (
                      <div key={element.name}>
                        <img src={element.icon} alt="icon élément" />
                        <p>{element.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="weeklyBossLocationNight">
                <p>Localisations</p>
                <div>
                  <img src={bossDetails?.region.icon} alt="icon region" />
                  <p>
                    {bossDetails?.region.name} - {bossDetails?.region.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="weeklyBossAllRewardsNight">
            <h2>Récompenses du Boss</h2>
            <div className="weeklyBossUniqueMaterialsNight">
              <h3>Matériaux d'amélioration de personnage</h3>
              <div>
                {bossDetails?.uniqueRewards.map((rewards) => {
                  return (
                    <div key={rewards.name}>
                      <div className="uniqueMaterialsIconNight">
                        <img src={rewards.icon} alt="icon rewards" />
                        <p>{rewards.name}</p>
                      </div>

                      <div className="uniqueMaterialsCharacterNight">
                        {rewards.character.map((character) => {
                          return (
                            <div
                              key={character.id}
                              onClick={() => {
                                navigate("/Characters/Details/" + character.id);
                              }}
                            >
                              <img src={character.icon} alt="icon character" />
                              <p>{character.name}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="weeklyBossAscensionMaterialsNight">
              <h3>Matériaux d'élévation de personnage</h3>
              <div>
                {bossDetails?.rewards.map((reward) => {
                  return (
                    <div key={reward.name}>
                      <img src={reward.icon} alt="icon récompense" />
                      <p>{reward.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WeeklyBossDetails;
