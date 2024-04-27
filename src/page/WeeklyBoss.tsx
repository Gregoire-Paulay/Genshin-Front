import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

//Type
import { WeeklyBossListSchema } from "../Schema/WeeklyBossSchema";
type WeeklyBoss = z.infer<typeof WeeklyBossListSchema>;

const WeeklyBoss = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bossData, setBossData] = useState<WeeklyBoss | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const { data } = await axios.get(`http://localhost:3000/boss/weekly`);
        // console.log(data);
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
        <div>
          <h1 className="weeklyBossTitleNight">Liste des Boss hebdomadaires</h1>
          <div className="allWeeklyBossNight">
            {bossData?.map((boss) => {
              return (
                <div key={boss.id}>
                  <div
                    className="weeklyBossIconNight"
                    onClick={() => {
                      navigate("/WeeklyBoss/Details/" + boss.id);
                    }}
                  >
                    <img src={boss.icon} alt="icon boss" />
                    <p>{boss.name}</p>
                  </div>

                  <div className="allRewardsNight">
                    {boss.uniqueRewards.map((rewards) => {
                      return (
                        <div key={rewards.name}>
                          <div
                            className="rewardsIconNight"
                            onClick={() => {
                              navigate("/WeeklyBoss/Details/" + boss.id);
                            }}
                          >
                            <img src={rewards.icon} alt="icon rewards" />
                            <p>{rewards.name}</p>
                          </div>

                          <div className="charactersBossNight">
                            {rewards.character.map((character) => {
                              return (
                                <div
                                  key={character.id}
                                  onClick={() => {
                                    navigate(
                                      "/Characters/Details/" + character.id
                                    );
                                  }}
                                >
                                  <img
                                    src={character.icon}
                                    alt="icon character"
                                  />
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
              );
            })}
          </div>
        </div>
      ) : (
        <div className="allWeeklyBoss">
          {bossData?.map((boss) => {
            return (
              <div key={boss.id}>
                <div
                  className="weeklyBossIcon"
                  onClick={() => {
                    navigate("/WeeklyBoss/Details/" + boss.id);
                  }}
                >
                  <img src={boss.icon} alt="icon boss" />
                  <p>{boss.name}</p>
                </div>
                <div className="allRewards">
                  {boss.uniqueRewards.map((rewards) => {
                    return (
                      <div key={rewards.name}>
                        <div className="rewardsIcon">
                          <p>{rewards.name}</p>
                          <img src={rewards.icon} alt="icon rewards" />
                        </div>

                        <div className="charactersBoss">
                          {rewards.character.map((character) => {
                            return (
                              <div
                                key={character.id}
                                onClick={() => {
                                  navigate(
                                    "/Characters/Details/" + character.id
                                  );
                                }}
                              >
                                <img
                                  src={character.icon}
                                  alt="icon character"
                                />
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeeklyBoss;