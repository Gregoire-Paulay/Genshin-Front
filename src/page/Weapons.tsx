import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import HashLoader from "react-spinners/HashLoader";

// Type
import { allWeaponsSchema } from "../Schema/WeaponsSchema";
type Weapons = z.infer<typeof allWeaponsSchema>;

type WeaponType =
  | "Épée"
  | "Arme d'hast"
  | "Épée à deux mains"
  | "Arc"
  | "Catalyseur";
type Rarity = 1 | 2 | 3 | 4 | 5;
type Refinment = 1 | 2 | 3 | 4 | 5;

// Fonction
import { sortWeaponsAlphabetically } from "../utils/sortFunction";

const AllWeapons = (): JSX.Element => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weaponsData, setWeaponsData] = useState<Weapons | null>(null);

  const [rarityFilters, setRarityFilters] = useState<Rarity | null>(null);
  const [typeFilters, setTypeFilters] = useState<WeaponType | null>(null);
  const [refinment, setRefinment] = useState<Refinment>(1);

  const weaponsFilters = (weapons: Weapons) => {
    let weaponsTab = [];

    if (rarityFilters && typeFilters) {
      for (let i = 0; i < weapons.length; i++) {
        if (
          rarityFilters === weapons[i].star &&
          typeFilters === weapons[i].type.name
        ) {
          weaponsTab.push(weapons[i]);
        }
      }
    }

    if (rarityFilters && !typeFilters) {
      for (let i = 0; i < weapons.length; i++) {
        if (rarityFilters === weapons[i].star) {
          weaponsTab.push(weapons[i]);
        }
      }
    }
    if (typeFilters && !rarityFilters) {
      for (let i = 0; i < weapons.length; i++) {
        if (typeFilters === weapons[i].type.name) {
          weaponsTab.push(weapons[i]);
        }
      }
    }

    return weaponsTab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(`http://localhost:3000/weapons`);
        const { data } = await axios.get(
          `https://site--genshinapi--m8kkvg9l2hpy.code.run/weapons`
        );
        // console.log(data);

        sortWeaponsAlphabetically(data);
        const allWeaponsParsed = allWeaponsSchema.parse(data);
        // console.log("WEAPON PARSED ===>", allWeaponsParsed);

        if (rarityFilters || typeFilters) {
          setIsLoading(true);
          setWeaponsData(weaponsFilters(allWeaponsParsed));
          setIsLoading(false);
          return;
        }

        setWeaponsData(allWeaponsParsed);
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
  }, [rarityFilters, typeFilters, refinment]);

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
      <div className="weaponPage">
        <div className="allWeaponsFilters">
          <div>
            <div className="weaponFilters">
              <div
                className={rarityFilters === 1 ? "filtersHighlight" : ""}
                onClick={() => {
                  if (rarityFilters === 1) {
                    setRarityFilters(null);
                  } else {
                    setRarityFilters(1);
                  }
                }}
              >
                <i className="fa-solid fa-star"></i>
              </div>

              <div
                className={rarityFilters === 2 ? "filtersHighlight" : ""}
                onClick={() => {
                  if (rarityFilters === 2) {
                    setRarityFilters(null);
                  } else {
                    setRarityFilters(2);
                  }
                }}
              >
                <i className="fa-solid fa-star"></i>
              </div>

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

            <div className="weaponFilters">
              <div
                className={typeFilters === "Épée" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (typeFilters === "Épée") {
                    setTypeFilters(null);
                  } else {
                    setTypeFilters("Épée");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708617933/Genshin/Weapons/IconEpee.webp"
                  alt="épée"
                />
              </div>

              <div
                className={
                  typeFilters === "Épée à deux mains" ? "filtersHighlight" : ""
                }
                onClick={() => {
                  if (typeFilters === "Épée à deux mains") {
                    setTypeFilters(null);
                  } else {
                    setTypeFilters("Épée à deux mains");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708617984/Genshin/Weapons/IconEspadon.webp"
                  alt="Espadon"
                />
              </div>

              <div
                className={
                  typeFilters === "Arme d'hast" ? "filtersHighlight" : ""
                }
                onClick={() => {
                  if (typeFilters === "Arme d'hast") {
                    setTypeFilters(null);
                  } else {
                    setTypeFilters("Arme d'hast");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708617967/Genshin/Weapons/IconLance.webp"
                  alt=""
                />
              </div>

              <div
                className={typeFilters === "Arc" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (typeFilters === "Arc") {
                    setTypeFilters(null);
                  } else {
                    setTypeFilters("Arc");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618001/Genshin/Weapons/IconArc.webp"
                  alt="Arc"
                />
              </div>

              <div
                className={
                  typeFilters === "Catalyseur" ? "filtersHighlight" : ""
                }
                onClick={() => {
                  if (typeFilters === "Catalyseur") {
                    setTypeFilters(null);
                  } else {
                    setTypeFilters("Catalyseur");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708617949/Genshin/Weapons/IconCatalyseur.webp"
                  alt="Catalyseur"
                />
              </div>
            </div>
          </div>

          <div className="refinment">
            <p>Raffinement</p>
            {refinment === 1 ? (
              <div className="refinmentLvl1">
                <div>
                  <i className="fa-solid fa-minus"></i>
                </div>
                <p>{refinment}</p>
                <button
                  onClick={() => {
                    setRefinment(2);
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            ) : refinment === 5 ? (
              <div className="refinmentLvl5">
                <button
                  onClick={() => {
                    setRefinment(4);
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <p>{refinment}</p>
                <div>
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>
            ) : (
              <div className="refinmentOtherLvl">
                <button
                  onClick={() => {
                    if (refinment === 4) {
                      setRefinment(3);
                    } else if (refinment === 3) {
                      setRefinment(2);
                    } else {
                      setRefinment(1);
                    }
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <p>{refinment}</p>
                <button
                  onClick={() => {
                    if (refinment === 2) {
                      setRefinment(3);
                    } else if (refinment === 3) {
                      setRefinment(4);
                    } else {
                      setRefinment(5);
                    }
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="allWeapons">
          {weaponsData?.map((weapons) => {
            return (
              <div key={weapons.id}>
                <h4
                  className={
                    weapons.star === 1
                      ? "weapon1"
                      : weapons.star === 2
                      ? "weapon2"
                      : weapons.star === 3
                      ? "weapon3"
                      : weapons.star === 4
                      ? "weapon4"
                      : "weapon5"
                  }
                >
                  {weapons.name}
                </h4>

                <div className="weaponDetails">
                  <img
                    src={weapons.icon}
                    alt=""
                    className={
                      weapons.star === 1
                        ? "weapon1"
                        : weapons.star === 2
                        ? "weapon2"
                        : weapons.star === 3
                        ? "weapon3"
                        : weapons.star === 4
                        ? "weapon4"
                        : "weapon5"
                    }
                  />
                  <div className="weaponStats">
                    <div>
                      <p> Type</p>
                      <p>{weapons.type.name}</p>
                    </div>
                    <div>
                      <p>ATQ de base</p>
                      <p>{weapons.atk}</p>
                    </div>
                    <div>
                      <p>{weapons.stat_secondaire?.type}</p>
                      <p>{weapons.stat_secondaire?.stat}</p>
                    </div>
                  </div>

                  <div className="weaponDescription">
                    <h6>{weapons.effect?.[0].title}</h6>
                    {weapons.effect?.map((effect) => {
                      return (
                        <span key={effect.text}>
                          <span>
                            {effect.text}
                            {refinment === 1 ? (
                              <span className="effectRefinment">
                                {effect.level?.r1}{" "}
                              </span>
                            ) : refinment === 2 ? (
                              <span className="effectRefinment">
                                {effect.level?.r2}
                              </span>
                            ) : refinment === 3 ? (
                              <span className="effectRefinment">
                                {effect.level?.r3}
                              </span>
                            ) : refinment === 4 ? (
                              <span className="effectRefinment">
                                {effect.level?.r4}
                              </span>
                            ) : (
                              <span className="effectRefinment">
                                {effect.level?.r5}
                              </span>
                            )}
                          </span>
                        </span>
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

export default AllWeapons;
