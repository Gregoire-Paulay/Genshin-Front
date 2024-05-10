import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

//Type
import { normalBossListSchema } from "../Schema/NormalBossSchema";
type NormalBoss = z.infer<typeof normalBossListSchema>;

// Fonction
import { sortBossAlphabetically } from "../utils/sortFunction";

const NormalBoss = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bossData, setBossData] = useState<NormalBoss | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(`http://localhost:3000/boss/normal`);
        const { data } = await axios.get(
          `https://site--genshinapi--m8kkvg9l2hpy.code.run/boss/normal`
        );
        // console.log(data);

        sortBossAlphabetically(data);

        const normalBossListParsed = normalBossListSchema.parse(data);
        // console.log(normalBossListParsed);

        setBossData(normalBossListParsed);
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
      <div>
        <h1
          className={
            theme === "night" ? "normalBossTitleNight" : "normalBossTitleDay"
          }
        >
          Liste des Boss de monde
        </h1>
        <div
          className={
            theme === "night" ? "allNormalBossNight" : "allNormalBossDay"
          }
        >
          {bossData?.map((boss) => {
            return (
              <div
                key={boss.id}
                onClick={() => {
                  navigate("/NormalBoss/Details/" + boss.id);
                }}
              >
                <img src={boss.icon} alt="icon boss" />
                <p>{boss.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NormalBoss;
