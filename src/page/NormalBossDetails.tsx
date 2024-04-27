import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

//Type
import { normalBossSchema } from "../Schema/NormalBossSchema";
type NormalBoss = z.infer<typeof normalBossSchema>;

const NormalBossDetails = (): JSX.Element => {
  const { id } = useParams();
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bossData, setBossData] = useState<NormalBoss | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const { data } = await axios.get(
          `http://localhost:3000/boss/normal/details?id=${id}`
        );
        console.log(data);

        setBossData(data);
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
        <div className="normalBossDetailsNight">
          <div className="normalBossDescriptionNight">
            <h2>{bossData?.name}</h2>
            <h6>{bossData?.title}</h6>
            <img src={bossData?.art} alt="artwork boss" />

            {bossData?.id === "B17" ? (
              <div className="coralBossDescriptionNight">
                <p>Élémentosaure abyssal morgivre</p>
                <div>{bossData.description[0].text}</div>
                <p>Élémentosaure abyssal mangéclair</p>
                <div>{bossData.description[1].text}</div>
              </div>
            ) : (
              <div className="normalBossTextNight">
                {bossData?.description.map((description, index) => {
                  return <div key={index}>{description.text}</div>;
                })}
              </div>
            )}

            {bossData?.element && (
              <div className="normalBossElementNight">
                <p>Éléments</p>
                <div>
                  {bossData?.element.map((element) => {
                    return (
                      <div key={element.name}>
                        <img src={element.icon} alt="icon élément" />
                        <p>{element.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="normalBossLocationNight">
              <p>Localisations</p>
              <div>
                <img src={bossData?.region.icon} alt="icon region" />
                <p>
                  {bossData?.region.name} - {bossData?.region.location}
                </p>
              </div>
            </div>
          </div>

          <div className="normalBossAllRewardsNight">
            <h2>Récompenses du Boss</h2>
            <div className="normalBossUniqueMaterialsNight">
              <h3>Matériaux d'amélioration de personnage</h3>
              <div>
                {bossData?.uniqueRewards.map((rewards) => {
                  return (
                    <div key={rewards.name}>
                      <div className="uniqueMaterialsIconNight">
                        <img src={rewards.icon} alt="icon rewards" />
                        <p>{rewards.name}</p>
                      </div>

                      <div className="uniqueMaterialsNormalBossCharacterNight">
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

            <div className="normalBossAscensionMaterialsNight">
              <h3>Matériaux d'élévation de personnage</h3>
              <div>
                {bossData?.rewards.map((reward) => {
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
        <div>Jour</div>
      )}
    </div>
  );
};

export default NormalBossDetails;