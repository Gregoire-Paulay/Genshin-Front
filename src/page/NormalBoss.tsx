import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

//Type
import { normalBossListSchema } from "../Schema/NormalBossSchema";
type NormalBoss = z.infer<typeof normalBossListSchema>;

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
        const { data } = await axios.get(`http://localhost:3000/boss/normal`);
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
        <div className="">
          {bossData?.map((boss) => {
            return (
              <div key={boss.id}>
                <div
                  className=""
                  onClick={() => {
                    navigate("" + boss.id);
                  }}
                >
                  <img src={boss.icon} alt="icon boss" />
                  <p>{boss.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NormalBoss;
