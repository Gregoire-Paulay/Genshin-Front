import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      <div
        className={
          theme === "night" ? "characterDetailsNight" : "characterDetailsDay"
        }
      >
        <div>
          <h2>{characterDetails?.name}</h2>
          <h6>{characterDetails?.title}</h6>

          {characterDetails?.wish ? (
            <div
              className={
                theme === "night"
                  ? "characterPictureChoiceNight"
                  : "characterPictureChoiceDay"
              }
            >
              <p
                onClick={() => {
                  setPictureChoice("artwork");
                }}
                className={
                  pictureChoice === "artwork" ? "pictureChoiceBorder" : ""
                }
              >
                Artwork
              </p>
              <p
                onClick={() => {
                  setPictureChoice("wish");
                }}
                className={
                  pictureChoice === "wish" ? "pictureChoiceBorder" : ""
                }
              >
                Voeu
              </p>
            </div>
          ) : (
            <div
              className={
                theme === "night"
                  ? "characterPictureChoiceNight2"
                  : "characterPictureChoiceDay2"
              }
            >
              <p>Artwork</p>
            </div>
          )}

          {pictureChoice === "artwork" && (
            <img src={characterDetails?.art} alt="Image perso" />
          )}
          {pictureChoice === "wish" && <img src={characterDetails?.wish} />}

          <div
            className={
              theme === "night"
                ? "characterDescriptionNight"
                : "characterDescriptionDay"
            }
          >
            {characterDetails?.description}
          </div>

          <div className="descriptionDetails">
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

          <div className="characterBio">
            <h4
              className={
                theme === "night"
                  ? "characterBioTitleNight"
                  : "characterBioTitleDay"
              }
            >
              Description
            </h4>

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

            <h4
              className={
                theme === "night"
                  ? "characterBioTitleNight"
                  : "characterBioTitleDay"
              }
            >
              Titres
            </h4>

            <div className="characterTitle">
              {characterDetails?.other_title.map((title) => {
                return <p key={title.name}>⏺ {title.name}</p>;
              })}
            </div>
          </div>
        </div>

        <div
          className={theme === "night" ? "allUpgradesNight" : "allUpgradesDay"}
        >
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
            <div className="allTalents">
              {characterDetails?.talents.map((talent) => {
                return (
                  <div
                    key={talent.name}
                    className={
                      theme === "night" ? "talentsNight" : "talentsDay"
                    }
                  >
                    <div>
                      <div>
                        <img src={talent.icon} alt="icon talent" />
                        <p>{talent.name}</p>
                      </div>
                      <p>{talent.type}</p>
                    </div>

                    <div className="talentsDescription">
                      {talent.description.map((description, index) => {
                        return (
                          <div key={index}>
                            <p className="talentsTitle">{description.name}</p>
                            <p>{description.text}</p>
                            {description.effect && (
                              <div className="talentsEffect">
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

                    {talent.note && <p className="talentNote">{talent.note}</p>}
                  </div>
                );
              })}
            </div>
          )}

          {details === "constellation" && (
            <div className="allConstellation">
              {/* <h3>Constellation</h3> */}
              {characterDetails?.constellation_upgrade.map((constellation) => {
                return (
                  <div
                    key={constellation.name}
                    className={
                      theme === "night"
                        ? "constellationNight"
                        : "constellationDay"
                    }
                  >
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

                    <div className="constellationDescription">
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
            <div className="allAscension">
              <h4>
                Matériau nécéssaire pour monter le personnage au niveau 90
              </h4>
              <div
                className={
                  theme === "night"
                    ? "ascensionMaterialNight"
                    : "ascensionMaterialDay"
                }
              >
                <h3>Mora</h3>
                <div>
                  <img
                    src={characterDetails?.ascension_materials.mora.picture}
                    alt="icon mora"
                  />
                  <p> 420 000</p>
                </div>
              </div>

              <div
                className={
                  theme === "night"
                    ? "ascensionMaterialNight2"
                    : "ascensionMaterialDay2"
                }
              >
                <h3>Pierre d'élévation</h3>

                <div>
                  {characterDetails?.ascension_materials.stone.map((stone) => {
                    return (
                      <div key={stone.name}>
                        <div
                          onClick={() => {
                            navigate("/Stone/Details/" + stone.id);
                          }}
                          className="ascensionLink"
                        >
                          <img src={stone.picture} alt="image stone" />
                          <p>{stone.number}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {characterDetails?.ascension_materials.bossLoot && (
                <div
                  className={
                    theme === "night"
                      ? "ascensionMaterialNight"
                      : "ascensionMaterialDay"
                  }
                >
                  <h3>Matériau de Boss de monde</h3>
                  <div
                    onClick={() => {
                      navigate(
                        "/NormalBoss/Details/" +
                          characterDetails.ascension_materials.bossLoot?.id
                      );
                    }}
                    className="ascensionLink"
                  >
                    <img
                      src={
                        characterDetails?.ascension_materials.bossLoot?.picture
                      }
                      alt=""
                    />
                    <p>
                      {characterDetails.ascension_materials.bossLoot.number}
                    </p>
                  </div>
                </div>
              )}

              <div
                className={
                  theme === "night"
                    ? "ascensionMaterialNight"
                    : "ascensionMaterialDay"
                }
              >
                <h3>Produit Régional</h3>
                <div>
                  <img
                    src={characterDetails?.ascension_materials.material.picture}
                    alt=""
                  />
                  <p>{characterDetails?.ascension_materials.material.number}</p>
                </div>
              </div>

              <div
                className={
                  theme === "night"
                    ? "ascensionMaterialNight2"
                    : "ascensionMaterialDay2"
                }
              >
                <h3>Matériau de mobs</h3>
                <div>
                  {characterDetails?.ascension_materials.mobLoot.map(
                    (mobLoot) => {
                      return (
                        <div key={mobLoot.name}>
                          <img src={mobLoot.picture} alt="" />
                          <p>{mobLoot.number}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}

          {details === "upgrade" && (
            <div className="allTalentsUpgrades">
              {characterDetails?.talent_upgrade.normal_attack ? (
                <div>
                  <div>
                    <h4>
                      Matériau nécéssaire pour monter l'attaque normale au
                      niveau 10
                    </h4>
                    <div className="ascensionMaterialNight">
                      <h3>Mora</h3>
                      <div>
                        <img
                          src={
                            characterDetails.talent_upgrade.normal_attack.mora
                              .picture
                          }
                          alt="image mora"
                        />
                        <p>1 652 000</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4>
                      Matériau nécéssaire pour monter la compétence et le
                      déchainement élémentaire au niveau 10
                    </h4>
                    <div className="ascensionMaterialNight">
                      <h3>Mora</h3>
                      <div>
                        <img
                          src={
                            characterDetails.talent_upgrade
                              .elemental_burst_skill?.mora.picture
                          }
                          alt="image mora"
                        />
                        <p>1 652 000</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4>
                    Matériau nécéssaire pour monter une aptitude au niveau 10
                  </h4>
                  <div
                    className={
                      theme === "night"
                        ? "ascensionMaterialNight"
                        : "ascensionMaterialDay"
                    }
                  >
                    <h3>Mora</h3>
                    <div>
                      <img
                        src={characterDetails?.talent_upgrade.mora?.picture}
                        alt="image mora"
                      />
                      <p>1 652 000</p>
                    </div>
                  </div>

                  <div
                    className={
                      theme === "night"
                        ? "ascensionMaterialNight2"
                        : "ascensionMaterialDay2"
                    }
                  >
                    <h3>Matériau de mobs</h3>
                    <div>
                      {characterDetails?.talent_upgrade.mobLoot?.map(
                        (mobLoot) => {
                          return (
                            <div key={mobLoot.name}>
                              <img src={mobLoot.picture} alt="image loot" />
                              <p>{mobLoot.number}</p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      theme === "night"
                        ? "ascensionMaterialNight2"
                        : "ascensionMaterialDay2"
                    }
                  >
                    <h3>Matériau d'aptitudes</h3>
                    <div>
                      {characterDetails?.talent_upgrade.books?.map((book) => {
                        return (
                          <div
                            key={book.name}
                            className="ascensionLink"
                            onClick={() => {
                              navigate("/Books");
                            }}
                          >
                            <img src={book.picture} alt="image loot" />
                            <p>{book.number}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className={
                      theme === "night"
                        ? "ascensionMaterialNight"
                        : "ascensionMaterialDay"
                    }
                  >
                    <h3>Matériau de Boss hebdomadaires</h3>
                    <div
                      className="ascensionLink"
                      onClick={() => {
                        navigate(
                          "/WeeklyBoss/Details/" +
                            characterDetails?.talent_upgrade.bossLoot?.id
                        );
                      }}
                    >
                      <img
                        src={characterDetails?.talent_upgrade.bossLoot?.picture}
                        alt="image loot"
                      />
                      <p>{characterDetails?.talent_upgrade.bossLoot?.number}</p>
                    </div>
                  </div>

                  <div
                    className={
                      theme === "night"
                        ? "ascensionMaterialNight"
                        : "ascensionMaterialDay"
                    }
                  >
                    <h3>{characterDetails?.talent_upgrade.crown?.name}</h3>
                    <div>
                      <img
                        src={characterDetails?.talent_upgrade.crown?.picture}
                        alt="image mora"
                      />
                      <p>{characterDetails?.talent_upgrade.crown?.number}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharactersDetails;
