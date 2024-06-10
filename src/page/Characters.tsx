import axios from "axios";
import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/theme-context";
import HashLoader from "react-spinners/HashLoader";

//Type
import { CharactersListSchema } from "../Schema/CharactersSchema";
type Character = z.infer<typeof CharactersListSchema>;

type Element =
  | "Anémo"
  | "Cryo"
  | "Dendro"
  | "Électro"
  | "Géo"
  | "Hydro"
  | "Pyro";
type Rarity = 4 | 5;

// Fonction
import { sortCharacterAlphabetically } from "../utils/sortFunction";

const Characters = (): JSX.Element => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [charactersData, setCharactersData] = useState<Character | null>(null);
  const [elementFilters, setElementFilters] = useState<Element | null>(null);
  const [rarityFilters, setRarityFilters] = useState<Rarity | null>(null);

  const charatersFilters = (character: Character) => {
    let charactersTab = [];
    if (elementFilters && rarityFilters) {
      for (let i = 0; i < character.length; i++) {
        if (
          elementFilters === character[i].element.type &&
          rarityFilters === character[i].star
        ) {
          charactersTab.push(character[i]);
        }
      }
    }

    if (elementFilters && !rarityFilters) {
      for (let i = 0; i < character.length; i++) {
        if (elementFilters === character[i].element.type) {
          charactersTab.push(character[i]);
        }
      }
    }
    if (rarityFilters && !elementFilters) {
      for (let i = 0; i < character.length; i++) {
        if (rarityFilters === character[i].star) {
          charactersTab.push(character[i]);
        }
      }
    }

    // console.log("Fonction SortCharacters", charactersTab);
    return charactersTab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // const { data } = await axios.get(`http://localhost:3000/characters`);
        const { data } = await axios.get(
          `https://site--genshinapi--m8kkvg9l2hpy.code.run/characters`
        );
        // console.log(data);

        // On se sert de la fonction pour trier par ordre alphabétique
        sortCharacterAlphabetically(data);

        const allCharactersParsed = CharactersListSchema.parse(data);
        console.log("All Char Parsed", allCharactersParsed);

        // Tri avec le filtre des éléments
        if (elementFilters || rarityFilters) {
          setIsLoading(true);
          setCharactersData(charatersFilters(allCharactersParsed));
          setIsLoading(false);
          return;
        }

        setCharactersData(allCharactersParsed);
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
  }, [elementFilters, rarityFilters]);
  // console.log("DATA", charactersData);

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
          <div className="allFilters">
            <div className="filters">
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
            </div>

            <div className="filters">
              <div
                className={elementFilters === "Anémo" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Anémo") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Anémo");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618455/Genshin/IconAnemo.webp"
                  alt="icon anémo"
                />
              </div>

              <div
                className={elementFilters === "Cryo" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Cryo") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Cryo");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618399/Genshin/IconCryo.webp"
                  alt="icon cryo"
                />
              </div>

              <div
                className={
                  elementFilters === "Dendro" ? "filtersHighlight" : ""
                }
                onClick={() => {
                  if (elementFilters === "Dendro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Dendro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618418/Genshin/IconDendro.webp"
                  alt="icon dendro"
                />
              </div>

              <div
                className={
                  elementFilters === "Électro" ? "filtersHighlight" : ""
                }
                onClick={() => {
                  if (elementFilters === "Électro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Électro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618437/Genshin/IconElectro.webp"
                  alt="icon électro"
                />
              </div>

              <div
                className={elementFilters === "Géo" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Géo") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Géo");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618493/Genshin/IconGeo.webp"
                  alt="icon géo"
                />
              </div>

              <div
                className={elementFilters === "Hydro" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Hydro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Hydro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618474/Genshin/IconHydro.webp"
                  alt="icon hydro"
                />
              </div>

              <div
                className={elementFilters === "Pyro" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Pyro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Pyro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618493/Genshin/IconPyro.webp"
                  alt="icon pyro"
                />
              </div>
            </div>
          </div>

          <div className="characterList">
            {charactersData?.map((character) => {
              return (
                <div
                  key={character.id}
                  onClick={() => {
                    navigate("/Characters/Details/" + character.id);
                  }}
                >
                  <img
                    src={character.icon}
                    alt="Icon Personnages"
                    className={character.star === 4 ? "star4BCG" : "star5BCG"}
                  />
                  <img
                    src={character.element.icon}
                    alt="Élément personnages"
                    className="characterElement"
                  />
                  <p>{character.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="">
          <div className="allFilters">
            <div className="filters">
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
            </div>

            <div className="filters">
              <div
                className={elementFilters === "Anémo" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Anémo") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Anémo");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618455/Genshin/IconAnemo.webp"
                  alt="icon anémo"
                />
              </div>

              <div
                className={elementFilters === "Cryo" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Cryo") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Cryo");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618399/Genshin/IconCryo.webp"
                  alt="icon cryo"
                />
              </div>

              <div
                className={
                  elementFilters === "Dendro" ? "filtersHighlight" : ""
                }
                onClick={() => {
                  if (elementFilters === "Dendro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Dendro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618418/Genshin/IconDendro.webp"
                  alt="icon dendro"
                />
              </div>

              <div
                className={
                  elementFilters === "Électro" ? "filtersHighlight" : ""
                }
                onClick={() => {
                  if (elementFilters === "Électro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Électro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618437/Genshin/IconElectro.webp"
                  alt="icon électro"
                />
              </div>

              <div
                className={elementFilters === "Géo" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Géo") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Géo");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618493/Genshin/IconGeo.webp"
                  alt="icon géo"
                />
              </div>

              <div
                className={elementFilters === "Hydro" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Hydro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Hydro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618474/Genshin/IconHydro.webp"
                  alt="icon hydro"
                />
              </div>

              <div
                className={elementFilters === "Pyro" ? "filtersHighlight" : ""}
                onClick={() => {
                  if (elementFilters === "Pyro") {
                    setElementFilters(null);
                  } else {
                    setElementFilters("Pyro");
                  }
                }}
              >
                <img
                  src="https://res.cloudinary.com/dy2ayuond/image/upload/v1708618493/Genshin/IconPyro.webp"
                  alt="icon pyro"
                />
              </div>
            </div>
          </div>

          <div className="characterList">
            {charactersData?.map((character) => {
              return (
                <div
                  key={character.id}
                  onClick={() => {
                    navigate("/Characters/Details/" + character.id);
                  }}
                >
                  <img
                    src={character.icon}
                    alt="Icon Personnages"
                    className={character.star === 4 ? "star4BCG" : "star5BCG"}
                  />
                  <img
                    src={character.element.icon}
                    alt="Élément personnages"
                    className="characterElement"
                  />
                  <p>{character.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Characters;
