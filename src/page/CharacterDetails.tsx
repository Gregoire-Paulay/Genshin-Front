import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useParams } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

// Type
import { CharacterDetailsSchema } from "../Schema/CharactersSchema";
type Character = z.infer<typeof CharacterDetailsSchema>;

type Details = "aptitude" | "constellation" | "upgrade" | "ascension";
type Picture = "artwork" | "wish" | "archon";

const CharactersDetails = () => {
  const { id } = useParams();
  const { theme } = useThemeContext();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [characterDetails, setCharactersDetails] = useState<Character>();
  const [details, setDetails] = useState<Details>("aptitude");
  const [pictureChoice, setPictureChoice] = useState<Picture>("artwork");

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
          <h6>{characterDetails?.title}</h6>

          {characterDetails?.wish ? (
            <div className="characterPictureChoiceNight">
              <p
                onClick={() => {
                  setPictureChoice("artwork");
                }}
                className={
                  pictureChoice === "artwork" ? "pictureChoiceBorderNight" : ""
                }
              >
                Artwork
              </p>
              <p
                onClick={() => {
                  setPictureChoice("wish");
                }}
                className={
                  pictureChoice === "wish" ? "pictureChoiceBorderNight" : ""
                }
              >
                Voeu
              </p>
            </div>
          ) : (
            <div className="characterPictureChoiceNight2">
              <p>Artwork</p>
            </div>
          )}

          {pictureChoice === "artwork" && (
            <img src={characterDetails?.art} alt="Image perso" />
          )}
          {pictureChoice === "wish" && <img src={characterDetails?.wish} />}

          <div className="characterDescriptionNight">
            {characterDetails?.description}
          </div>

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

            {characterDetails?.real_name && (
              <div>
                <p className="bold">Vrai nom</p>
                <div>{characterDetails?.real_name}</div>
              </div>
            )}

            <div>
              <p className="bold">Anniversaire</p>
              <div>{characterDetails?.birthday}</div>
            </div>

            <div>
              <p className="bold">Region</p>
              <div className="column">
                {characterDetails?.region.map((region) => {
                  return (
                    <div key={region.name}>
                      {region.icon && (
                        <img src={region.icon} alt="icon region" />
                      )}
                      <p>{region.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {characterDetails?.affiliation && (
              <div>
                <p className="bold">Affiliations</p>
                <div className="column">
                  {characterDetails.affiliation.length === 1
                    ? characterDetails.affiliation.map((affiliation) => {
                        return (
                          <p key={affiliation.name}> {affiliation.name}</p>
                        );
                      })
                    : characterDetails?.affiliation?.map((affiliation) => {
                        return (
                          <p key={affiliation.name}>⏺ {affiliation.name}</p>
                        );
                      })}
                </div>
              </div>
            )}

            {characterDetails?.namecard && (
              <div>
                <p className="bold">Namecard</p>
                <div>
                  <img src={characterDetails?.namecard?.icon} alt="icon card" />
                  <p>{characterDetails?.namecard?.name}</p>
                </div>
              </div>
            )}

            {characterDetails?.dish && (
              <div>
                <p className="bold">Spécialité</p>
                <div>
                  <img src={characterDetails?.dish?.icon} alt="icon plat" />
                  <p>{characterDetails?.dish?.name}</p>
                </div>
              </div>
            )}

            <div>
              <p className="bold">Date de sortie</p>
              <div>{characterDetails?.release_date}</div>
            </div>

            <h4>Titres</h4>

            <div className="characterTitle">
              {characterDetails?.other_title.map((title) => {
                return <p key={title.name}>⏺ {title.name}</p>;
              })}
            </div>
          </div>

          {/* <div className="characterStats">
            <p>Statistiques</p>

            <div>
              <p>test</p>
              <p>test2</p>
            </div>
          </div> */}
        </div>

        <div className="allUpgradesNight">
          <div>
            <p
              onClick={() => {
                setDetails("ascension");
              }}
              className={
                details === "ascension" ? "characterUpgradesChoice" : ""
              }
            >
              Ascension
            </p>
            <p
              onClick={() => {
                setDetails("aptitude");
              }}
              className={
                details === "aptitude" ? "characterUpgradesChoice" : ""
              }
            >
              Aptitudes
            </p>
            <p
              onClick={() => {
                setDetails("upgrade");
              }}
              className={details === "upgrade" ? "characterUpgradesChoice" : ""}
            >
              Amélioration aptitudes
            </p>
            <p
              onClick={() => {
                setDetails("constellation");
              }}
              className={
                details === "constellation" ? "characterUpgradesChoice" : ""
              }
            >
              Constellation
            </p>
          </div>

          {details === "aptitude" && (
            <div className="allTalentsNight">
              {characterDetails?.talents.map((talent) => {
                return (
                  <div key={talent.name} className="talentsNight">
                    <div>
                      <div>
                        <img src={talent.icon} alt="icon talent" />
                        <p>{talent.name}</p>
                      </div>
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
                            {description.effect && (
                              <div className="talentsEffectNight">
                                {description.effect?.map((effect) => {
                                  return (
                                    <div key={effect.text}>
                                      ⏺<p>{effect.text}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {talent.note && (
                      <p className="talentNoteNight">{talent.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {details === "constellation" && (
            <div className="allConstellationNight">
              {/* <h3>Constellation</h3> */}
              {characterDetails?.constellation_upgrade.map((constellation) => {
                return (
                  <div key={constellation.name} className="constellationNight">
                    <div>
                      <div>
                        <img
                          src={constellation.icon}
                          alt="icon constellation"
                        />
                        <p>{constellation.name}</p>
                      </div>
                      <p>Constellation Niv.{constellation.level}</p>
                    </div>

                    <div className="constellationDescriptionNight">
                      <p>{constellation.description.text}</p>
                      {constellation.description.effect && (
                        <div>
                          {constellation.description.effect?.map((effect) => {
                            return (
                              <div key={effect.text}>
                                ⏺ <p>{effect.text}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {constellation.description.note && (
                        <p>{constellation.description.note}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {details === "ascension" && (
            <div className="allAscensionNight">
              <div className="ascensionMoraNight">
                <h3>Mora</h3>
                <div>
                  <img
                    src={characterDetails?.ascension_materials.mora.picture}
                    alt="icon mora"
                  />
                  <p> {characterDetails?.ascension_materials.mora.number}</p>
                </div>
              </div>

              <div className="ascensionStoneNight">
                {characterDetails?.ascension_materials.stone.map((stone) => {
                  return (
                    <div key={stone.id}>
                      <div>
                        <img src={stone.picture} alt="image stone" />
                        <p>{stone.number}</p>
                      </div>
                      <p>{stone.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {details === "upgrade" && (
            <div className="allTalentsNight">Talent Upgrade</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharactersDetails;
