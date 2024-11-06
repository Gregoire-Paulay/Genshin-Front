import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import HashLoader from "react-spinners/HashLoader";

//Type
import { ArtifactsSchema } from "../Schema/artifacts";
type Artifacts = z.infer<typeof ArtifactsSchema>;

type Rarity = 3 | 4 | 5;

// Fonction
import { sortArtifactsAlphabetycally } from "../utils/sortFunction";

const AllArtifacts = (): JSX.Element => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [artifactsData, setArtifactsData] = useState<Artifacts | null>(null);

  const [rarityFilters, setRarityFilters] = useState<Rarity | null>(null);

  const artifactsFilters = (artifacts: Artifacts) => {
    let artifactsTab = [];

    if (rarityFilters) {
      for (let i = 0; i < artifacts.length; i++) {
        if (rarityFilters === artifacts[i].star) {
          artifactsTab.push(artifacts[i]);
        }
      }
    }
    return artifactsTab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(`http://localhost:3000/artifacts`);
        const { data } = await axios.get(
          `https://site--genshinapi--m8kkvg9l2hpy.code.run/artifacts`
        );
        // console.log(data);

        sortArtifactsAlphabetycally(data);
        const AllArtifactsParsed = ArtifactsSchema.parse(data);
        // console.log("Artifacts PARSED ===>", AllArtifactsParsed);

        if (rarityFilters) {
          setIsLoading(true);
          setArtifactsData(artifactsFilters(AllArtifactsParsed));
          setIsLoading(false);
          return;
        }

        setArtifactsData(AllArtifactsParsed);
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
  }, [rarityFilters]);

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
      <div className="artifactsPage">
        <div className="artifactsFilters">
          <div
            className={rarityFilters === 3 ? "filtersHighlight" : ""}
            onClick={() => {
              if (rarityFilters === 3) {
                setRarityFilters(null);
              } else {
                setRarityFilters(3);
              }
            }}
          >
            <i className="fa-solid fa-star"></i>
          </div>

          <div
            className={rarityFilters === 4 ? "filtersHighlight" : ""}
            onClick={() => {
              if (rarityFilters === 4) {
                setRarityFilters(null);
              } else {
                setRarityFilters(4);
              }
            }}
          >
            <i className="fa-solid fa-star"></i>
          </div>

          <div
            className={rarityFilters === 5 ? "filtersHighlight" : ""}
            onClick={() => {
              if (rarityFilters === 5) {
                setRarityFilters(null);
              } else {
                setRarityFilters(5);
              }
            }}
          >
            <i className="fa-solid fa-star"></i>
          </div>
        </div>

        <div className="allArtifacts">
          {artifactsData?.map((artifact) => {
            return (
              <div key={artifact.id}>
                <h4
                  className={
                    artifact.star === 3
                      ? "artifact3"
                      : artifact.star === 4
                      ? "artifact4"
                      : "artifact5"
                  }
                >
                  {artifact.set_name}
                </h4>

                <div className="artifactDetails">
                  <img
                    src={artifact.set_details[0].icon}
                    alt=""
                    className={
                      artifact.star === 3
                        ? "artifact3"
                        : artifact.star === 4
                        ? "artifact4"
                        : "artifact5"
                    }
                  />
                  <div className="artifactBonus">
                    {artifact.bonus.map((bonus) => {
                      return (
                        <div key={bonus.name}>
                          <p>{bonus.name}</p>
                          <p>{bonus.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllArtifacts;
