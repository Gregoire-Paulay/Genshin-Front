import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useParams } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

// Type
import { CharacterDetailsSchema } from "../Schema/CharactersSchema";
type Character = z.infer<typeof CharacterDetailsSchema>;

type Details = "aptitude" | "constellation";

const CharactersDetails = () => {
  const { id } = useParams();
  const { theme } = useThemeContext();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [characterDetails, setCharactersDetails] = useState<Character>();
  const [details, setDetails] = useState<Details>("aptitude");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(
        //   `https://site--genshinapi--m8kkvg9l2hpy.code.run/characters/details?id=${id}`
        // );
        const { data } = await axios.get(
          `http://localhost:3000/characters/details?id=${id}`
        );
        // console.log(data);

        const characterDetailsParsed = CharacterDetailsSchema.parse(data);
        console.log("Data Parsed", characterDetailsParsed);

        setCharactersDetails(characterDetailsParsed);
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
      <div className="characterDetailsNight">
        <div>
          <h2>{characterDetails?.name}</h2>
          <p>{characterDetails?.title}</p>
          <img src={characterDetails?.art} alt="Image perso" />

          <div className="descriptionDetailsNight">
            <div>
              <h6>Élément</h6>
              <div>
                <img src={characterDetails?.element.icon} alt="icon element" />
                <p>{characterDetails?.element.type}</p>
              </div>
            </div>

            <div>
              <h6>Arme</h6>
              <div>
                <img src={characterDetails?.weapon.icon} alt="icon element" />
                <p>{characterDetails?.weapon.type}</p>
              </div>
            </div>

            <div>
              <h6>Constellation</h6>
              <div>
                <img
                  src={characterDetails?.constellation.icon}
                  alt="icon element"
                />
                <p>{characterDetails?.constellation.name}</p>
              </div>
            </div>

            <div>
              <h6>Rareté</h6>
              <div>
                {characterDetails?.star === 5 ? (
                  <p>
                    <i className="fa-solid fa-star"></i>{" "}
                    <i className="fa-solid fa-star"></i>{" "}
                    <i className="fa-solid fa-star"></i>{" "}
                    <i className="fa-solid fa-star"></i>{" "}
                    <i className="fa-solid fa-star"></i>
                  </p>
                ) : (
                  <p>
                    <i className="fa-solid fa-star"></i>{" "}
                    <i className="fa-solid fa-star"></i>{" "}
                    <i className="fa-solid fa-star"></i>{" "}
                    <i className="fa-solid fa-star"></i>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="characterBioNight">
            <h4>Description</h4>
            <div>{characterDetails?.description}</div>
            <div>
              <p>Affiliations</p>
              {characterDetails?.affiliation?.map((affiliation) => {
                return <div key={affiliation.name}>{affiliation.name}</div>;
              })}
            </div>

            <div>{characterDetails?.birthday}</div>
          </div>
        </div>

        <div className="allUpgradesNight">
          <div>
            <p>Ascension</p>
            <p
              onClick={() => {
                setDetails("aptitude");
              }}
            >
              Aptitudes
            </p>
            <p>Amélioration aptitudes</p>
            <p
              onClick={() => {
                setDetails("constellation");
              }}
            >
              Constellation
            </p>
          </div>

          {details === "aptitude" && (
            <div className="allTalentsNight">
              {/* <h3>Aptitudes</h3> */}
              {characterDetails?.talents.map((talent) => {
                return (
                  <div key={talent.name} className="talentsNight">
                    <div>
                      <p>{talent.name}</p>
                      <p>{talent.type}</p>
                    </div>

                    <div className="talentsDescriptionNight">
                      {talent.description.map((description, index) => {
                        return (
                          <div key={index}>
                            <p className="talentsTitleNight">
                              {description.name}
                            </p>
                            <p>{description.text}</p>
                            <div>
                              {description.effect?.map((effect) => {
                                return (
                                  <div key={effect.text}>
                                    <p style={{ color: "blue" }}>
                                      {effect.text}
                                    </p>
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

          {details === "constellation" && (
            <div className="allTalentsNight">
              {/* <h3>Constellation</h3> */}
              {characterDetails?.constellation_upgrade.map((constellation) => {
                return (
                  <div key={constellation.name} className="talentsNight">
                    <div>
                      <p>{constellation.name}</p>
                      <p>Constellation Niv.{constellation.level}</p>
                    </div>

                    <div className="talentsDescriptionNight">
                      <div>
                        <p>{constellation.description.text}</p>
                        <div>
                          {constellation.description.effect?.map((effect) => {
                            return (
                              <div key={effect.text}>
                                <p>{effect.text}</p>
                              </div>
                            );
                          })}
                        </div>
                        <p>{constellation.description.note}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharactersDetails;
