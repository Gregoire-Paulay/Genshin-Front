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
      {/* <p>Élémentosaure abyssal morgivre</p>
      <p>Élémentosaure abyssal mangéclair</p> */}
      {theme === "night" ? (
        <div className="normalBossDetailsNight">
          <div className="normalBossDescriptionNight">
            <h2>{bossData?.name}</h2>
            <h6>{bossData?.title}</h6>
            <img src={bossData?.art} alt="artwork boss" />

            <div className="normalBossTextNight">
              {bossData?.description.map((description, index) => {
                return <div key={index}>{description.text}</div>;
              })}
            </div>

            <div></div>
          </div>

          <div>Récompenses</div>
        </div>
      ) : (
        <div>Jour</div>
      )}

      {/* <div>
                  {boss.uniqueRewards.length ? (
                    boss.uniqueRewards.map((reward) => {
                      return <div>{reward.name} </div>;
                    })
                  ) : (
                    <p>{boss.uniqueRewards.name}</p>
                  )}
                </div> */}
    </div>
  );
};

export default NormalBossDetails;
